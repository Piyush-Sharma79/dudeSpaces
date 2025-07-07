import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

export const Live = () => {
  const { useIsCallLive } = useCallStateHooks();
  const call = useCall();
  const isLive = useIsCallLive();

  return (
    <button
      onClick={async () => {
        if (isLive) {
          call?.stopLive();
        } else {
          call?.goLive();
        }
      }}
    >
      {isLive ? "Live" : "Not Live"}
    </button>
  );
};
