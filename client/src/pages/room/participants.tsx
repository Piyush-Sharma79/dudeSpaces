import { useCallStateHooks, ParticipantsAudio } from "@stream-io/video-react-sdk";
import { Participant } from "./participant";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export const Participants = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <Card className="bg-[#0C0C14]/70 border-[#92FF58]/10 overflow-hidden">
      <CardHeader className="px-8 py-6 border-b border-[#92FF58]/10">
        <CardTitle className="text-2xl font-acorn font-light text-center">
          Participants ({participants.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="participants flex flex-wrap justify-center gap-4 md:gap-6">
          <ParticipantsAudio participants={participants} />
          {participants.map((p) => (
            <Participant participant={p} key={p.sessionId} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
