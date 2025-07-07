import { Mic } from "./mic";
import { Live } from "./live";
export const Controls = () => {
  return (
    <div className="controls-panel">
      <Mic />
      <Live />
    </div>
  );
};
