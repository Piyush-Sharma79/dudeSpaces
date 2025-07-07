import { Call, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "../../user-context";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import CryptoJS from "crypto-js";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

interface NewRoom {
  name: string;
  description: string;
}
interface Room {
  id: string;
  title: string;
  description: string;
  participantsLength: number;
  createdBy: string;
}
type CustomCallData = {
  title: string;
  description: string;
};
export const MainPage = () => {
  const { client, user, setCall, isLoadingClient } = useUser();
  const [newRoom, setNewRoom] = useState<NewRoom>({
    name: "",
    description: "",
  });
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const fetchListofCalls = useCallback(async () => {
    const callsQueryResponse = await client?.queryCalls({
      filter_conditions: {
        ongoing: true,
      },
      limit: 4,
      watch: true,
    });
    if (!callsQueryResponse) {
      alert("Error getting calls");
    } else {
      const getCallInfo = async (call: Call): Promise<Room> => {
        const callInfo = await call.get();
        const customData = callInfo.call.custom;
        const { title, description } = (customData || {}) as CustomCallData;
        const participantsLength = callInfo.members.length;
        const createdBy = callInfo.call.created_by.name ?? "";
        const id = callInfo.call.id ?? "";
        return {
          id,
          title: title ?? "",
          description: description ?? "",
          participantsLength,
          createdBy,
        };
      };
      const roomPromises = await callsQueryResponse.calls.map((call) =>
        getCallInfo(call)
      );
      const rooms = await Promise.all(roomPromises);
      setAvailableRooms(rooms);
    }
  }, [client]);

  useEffect(() => {
    if (client) fetchListofCalls();
  }, [client, fetchListofCalls]);

  const hashRoomName = (roomName: string): string => {
    const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
    return hash.replace(/[^a-zA-Z0-9_-]/g, "");
  };
  
  const createRoom = async () => {
    const { name, description } = newRoom;
    if (!client || !user || !name || !description) {
      setError("Please fill all the fields to create a room.");
      return;
    }
    setError(null);
    const call = client.call("audio_room", hashRoomName(name));
    await call.join({
      create: true,
      data: {
        members: [{ user_id: user.username }],
        custom: {
          title: name,
          description,
        },
      },
    });
    setCall(call);
    navigate("/room");
  };
  const joinCall = async (callId: string) => {
    const call = client?.call("audio_room", callId);
    try {
      await call?.join();
      setCall(call);
      navigate("/room");
    } catch (err) {
      console.error("Error joining call:", err);
      setError("Failed to join the room. Please try again.");
    }
  };

  if (isLoadingClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <StreamVideo client={client!}>
      <div className="home container mx-auto p-4 md:p-6 animate-fade-in">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="title" style={{ fontFamily: 'Summer Outfit'}}>Welcome to DudeSpaces</h1>
          <p className="description">Create a new audio room or join an existing one.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Create Room Section */}
          <div className="create-room-section animate-fade-in">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="subtitle">Create a New Room</CardTitle>
                <CardDescription>Start a conversation on any topic.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Room Name"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  className="input"
                />
                <Input
                  placeholder="Room Description"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  className="input"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button onClick={createRoom} className="w-full btn">Create Room</Button>
              </CardContent>
            </Card>
          </div>

          {/* Available Rooms Section */}
          <div className="available-rooms-section animate-fade-in">
            <h2 className="subtitle text-center mb-4">Available Rooms</h2>
            {availableRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableRooms.map((room) => (
                  <Card key={room.id} className="card glass-light cursor-pointer" onClick={() => joinCall(room.id)}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold truncate">{room.title}</CardTitle>
                      <CardDescription className="truncate">{room.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">By {room.createdBy}</div>
                      <div className="flex items-center gap-2 text-sm font-medium participation-count">
                        <span>{room.participantsLength}</span>
                        <span>👤</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 p-8 glass-light rounded-2xl">
                <p>No available rooms at the moment. Why not create one?</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StreamVideo>
  );
};
