import {
  OwnCapability,
  useCallStateHooks,
  useRequestPermission,
} from "@stream-io/video-react-sdk";
import { Controls } from "./controls";
import { Participants} from "./participants";
import { useUser} from "../../user-context"
import { PermissionRequestPanel} from "./permission-request"

export const Room = () => {
  const { useCallCustomData, useParticipants, useCallCreatedBy } =
    useCallStateHooks();
    const {user} = useUser();
  const customData = useCallCustomData();
  const createdBy = useCallCreatedBy();
  const participants = useParticipants();

  const { hasPermission ,requestPermission} = useRequestPermission(OwnCapability.SEND_AUDIO);
  return (
    <div className="room">
      <h2 className="title">{customData?.title ?? "TITLE"}</h2>
      <h3 className="description">
        {customData?.description ?? "DESCRIPTION"}
      </h3>
      <p className="participation-count">{participants.length} participants</p>
      <Participants />
      {user?.username === createdBy?.id && <PermissionRequestPanel />}
      {hasPermission ? <Controls /> : <button onClick={requestPermission}> &#9995;</button>}
    </div>

  );
};
