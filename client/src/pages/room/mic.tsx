import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "../../components/ui/button";

export const Mic = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  return (
    <Button
      onClick={async() => {
        if (isMute) {
          await microphone?.enable();
        } else {
          await microphone?.disable();
        }
      }}
      variant="secondary"
      className={`flex items-center gap-2 px-6 py-3 text-base md:text-lg transition-all duration-300 ${
        isMute
          ? 'bg-[#251515] border-red-500/30 hover:bg-[#301515] text-red-400 hover:border-red-500/50'
          : 'bg-[#152515] border-[#92FF58]/30 hover:bg-[#1A2A1A] text-[#92FF58] hover:border-[#92FF58]/50'
      }`}
    >
      {isMute ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      )}
      <span>{isMute ? "Unmute" : "Mute"}</span>
    </Button>
  );
};
