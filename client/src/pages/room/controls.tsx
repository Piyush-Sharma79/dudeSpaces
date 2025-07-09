import { Mic } from "./mic";
import { Live } from "./live";
import { useNavigate } from "react-router-dom";
import { useCall } from "@stream-io/video-react-sdk";
import { Button } from "../../components/ui/button";

export const Controls = () => {
  const navigate = useNavigate();
  const call = useCall();

  const leaveRoom = async () => {
    await call?.leave();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-6 md:gap-8 px-2 md:px-6 py-2 md:py-3">
      <Mic />
      <Live />
      <Button
        onClick={leaveRoom}
        variant="secondary"
        className="flex items-center gap-2 bg-[#1E1E2D]/80 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 transition-colors duration-300 px-6 py-3 text-base md:text-lg"
      >
        <span>Leave Room</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </Button>
    </div>
  );
};
