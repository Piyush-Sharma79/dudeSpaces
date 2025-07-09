import { Avatar, StreamVideoParticipant } from "@stream-io/video-react-sdk";

export const Participant = ({
  participant,
}: {
  participant: StreamVideoParticipant;
}) => {
  const { isSpeaking } = participant;

  return (
    <div className={`participant ${isSpeaking ? 'speaking' : ''} px-5 py-6`}>
      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="w-7 h-7 bg-gradient-to-r from-[#92FF58] to-[#4DCD4D] rounded-full flex items-center justify-center">
            <span className="text-sm">🎙️</span>
          </div>
        </div>
      )}

      {/* Avatar with glow effect */}
      <div className="relative mb-4">
        <div className={`w-24 h-24 rounded-full overflow-hidden transition-all duration-300 mx-auto ${
          isSpeaking
            ? 'ring-2 ring-[#92FF58] shadow-lg shadow-[#92FF58]/30'
            : 'ring-1 ring-white/10'
        }`}>
          <Avatar
            imageSrc={participant.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Glow effect for speaking participants */}
          {isSpeaking && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#92FF58]/20 to-transparent mix-blend-overlay"></div>
          )}
        </div>

        {/* Online indicator */}
        <div className="absolute -bottom-1 right-6 w-4 h-4 bg-[#92FF58] rounded-full ring-2 ring-[#0C0C14]"></div>
      </div>

      {/* Name */}
      <div className="text-center">
        <div className="text-sm font-medium text-white/90 font-space-grotesk truncate max-w-[140px] mx-auto">
          {participant.name}
        </div>
        {isSpeaking && (
          <div className="text-xs text-[#92FF58] font-medium mt-1">
            Speaking
          </div>
        )}
      </div>
    </div>
  );
};
