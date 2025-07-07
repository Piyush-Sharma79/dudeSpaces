import { Avatar, StreamVideoParticipant } from "@stream-io/video-react-sdk";

export const Participant = ({
  participant,
}: {
  participant: StreamVideoParticipant;
}) => {
  const { isSpeaking } = participant;

  return (
    <div className={`participant ${isSpeaking ? 'speaking' : ''}`}>
      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-sm">🎤</span>
          </div>
        </div>
      )}
      
      {/* Avatar */}
      <div className="relative">
        <div className={`w-20 h-20 rounded-full overflow-hidden border-3 transition-all duration-300 ${
          isSpeaking 
            ? 'border-green-400 shadow-lg shadow-green-400/50 animate-pulse' 
            : 'border-white/20'
        }`}>
          <Avatar
            imageSrc={participant.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        
        {/* Online indicator */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
      </div>
      
      {/* Name */}
      <div className="text-center mt-3">
        <div className="text-sm font-semibold text-white">
          {participant.name}
        </div>
        {isSpeaking && (
          <div className="text-xs text-green-400 font-medium mt-1 animate-pulse">
            Speaking
          </div>
        )}
      </div>
    </div>
  );
};