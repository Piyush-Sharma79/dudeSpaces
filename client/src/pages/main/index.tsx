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
      <div className="home container mx-auto p-6 md:p-10 animate-fade-in">
        <div className="text-center mb-16 animate-slide-up flex flex-col items-center justify-center">
          <div className="flex justify-center items-center w-full mb-4">
            <img src="/logo-color.svg" alt="DudeSpaces Logo" className="w-20 h-20 mx-auto animate-glow" />
          </div>
          <h1 className="title">Welcome to DudeSpaces</h1>
          <p className="description max-w-2xl mx-auto mt-4">Create a new audio room or join an existing one to connect with other users in real-time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
          {/* Create Room Section */}
          <div className="create-room-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="glass h-full overflow-hidden">
              <CardHeader className="px-10 py-8 border-b border-[#92FF58]/10">
                <CardTitle className="subtitle text-2xl">Create a New Room</CardTitle>
                <CardDescription className="mt-2 text-base">Start a conversation on any topic and invite others to join.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-10">
                <div>
                  <label htmlFor="roomName" className="block mb-3 text-sm font-medium text-white/80">Room Name</label>
                  <Input
                    id="roomName"
                    placeholder="Enter a name for your room"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="input py-4 px-5 text-base"
                  />
                </div>
                <div>
                  <label htmlFor="roomDesc" className="block mb-3 text-sm font-medium text-white/80">Room Description</label>
                  <Input
                    id="roomDesc"
                    placeholder="What's this room about?"
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                    className="input py-4 px-5 text-base"
                  />
                </div>
                {error && <p className="text-red-400 text-sm font-medium mt-2">{error}</p>}
                <Button onClick={createRoom} className="w-full btn py-5 text-base mt-2">
                  <span className="mr-2">Create Room</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Available Rooms Section */}
          <div className="available-rooms-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="subtitle text-center mb-6 text-2xl">Available Rooms</h2>
            {availableRooms.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {availableRooms.map((room) => (
                  <Card key={room.id} className="card glass-light cursor-pointer transition-all duration-300" onClick={() => joinCall(room.id)}>
                    <CardHeader className="px-6 py-5">
                      <CardTitle className="text-lg font-semibold truncate">{room.title}</CardTitle>
                      <CardDescription className="truncate">{room.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center px-6 py-4 border-t border-[#92FF58]/10">
                      <div className="text-sm text-white/60 font-space-grotesk">Hosted by {room.createdBy}</div>
                      <div className="participation-count">
                        <span>{room.participantsLength}</span>
                        <span className="text-[#92FF58]">●</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center glass-light rounded-2xl p-10">
                <div className="text-4xl mb-4">🎧</div>
                <p className="text-white/60 font-space-grotesk">No available rooms at the moment.</p>
                <p className="text-white/60 font-space-grotesk mt-2">Create one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StreamVideo>
  );
};
