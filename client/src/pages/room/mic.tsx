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
    >
      {isMute ? "Unmute" : "Mute"}
    </button>
  );
};
