import { Mic } from "./mic";
import { Live } from "./live";
import { useNavigate } from "react-router-dom";
import { useCall } from "@stream-io/video-react-sdk";

export const Controls = () => {
  const navigate = useNavigate();
  const call = useCall();

  const leaveRoom = async () => {
    await call?.leave();
    navigate("/");
  };

  return (
    <div className="controls-panel">
      <Mic />
      <Live />
      <button 
        onClick={leaveRoom}
        className="btn-secondary px-6 py-3 rounded-xl transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30"
      >
        Leave Hangout
      </button>
    </div>
  );
};
