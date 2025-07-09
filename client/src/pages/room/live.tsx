import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "../../components/ui/button";

export const Live = () => {
  const { useIsCallLive } = useCallStateHooks();
  const call = useCall();
  const isLive = useIsCallLive();

  return (
    <Button
      onClick={async () => {
        if (isLive) {
          call?.stopLive();
        } else {
          call?.goLive();
        }
      }}
      variant="secondary"
      className={`flex items-center gap-2 px-6 py-3 text-base md:text-lg transition-all duration-300 ${
        isLive
          ? 'bg-[#251515] border-red-500/30 hover:bg-[#301515] text-red-400 hover:border-red-500/50'
          : 'bg-[#151525] border-blue-400/30 hover:bg-[#1A1A2A] text-blue-400 hover:border-blue-400/50'
      }`}
    >
      <div className="flex items-center gap-2">
        {isLive ? (
          <span className="relative">
            <span className="absolute top-0 left-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></span>
            <span className="relative w-3 h-3 bg-red-500 rounded-full"></span>
          </span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7l-7 5 7 5V7z"></path>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        )}
        <span>{isLive ? "End Broadcast" : "Go Live"}</span>
      </div>
    </Button>
  );
};
