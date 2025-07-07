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
      className={`btn-secondary px-8 py-4 text-lg font-semibold transition-all duration-300 ${
        isLive 
          ? 'bg-red-500/20 border-red-500/40 hover:bg-red-500/30 text-red-300' 
          : 'bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30 text-blue-300'
      }`}
    >
      <span className="flex items-center">
        <span className="mr-3 text-xl">
          {isLive ? "🔴" : "📡"}
        </span>
        <div className={`w-3 h-3 rounded-full mr-3 ${
          isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
        }`}></div>
        {isLive ? "End Broadcast" : "Go Live"}
      </span>
    </button>
  );
};
