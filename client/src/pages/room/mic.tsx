import { useCallStateHooks } from "@stream-io/video-react-sdk";

export const Mic = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();
  
  return (
    <button
      onClick={async() => {
        if (isMute) {
          await microphone?.enable();
        } else {
          await microphone?.disable();
        }
      }}
      className={`btn-secondary px-8 py-4 text-lg font-semibold transition-all duration-300 ${
        isMute 
          ? 'bg-red-500/20 border-red-500/40 hover:bg-red-500/30 text-red-300' 
          : 'bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300'
      }`}
    >
      <span className="mr-3 text-xl">
        {isMute ? "🔇" : "🎤"}
      </span>
      {isMute ? "Unmute" : "Mute"}
    </button>
  );
};
