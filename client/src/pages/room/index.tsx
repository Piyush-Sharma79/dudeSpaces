import {
  OwnCapability,
  useCallStateHooks,
  useRequestPermission,
} from "@stream-io/video-react-sdk";
import { Controls } from "./controls";
import { Participants } from "./participants";
import { useUser } from "../../user-context";
import { PermissionRequestPanel } from "./permission-request";
import { Button } from "../../components/ui/button";

export const Room = () => {
  const { useCallCustomData, useParticipants, useCallCreatedBy } =
    useCallStateHooks();
  const { user } = useUser();
  const customData = useCallCustomData();
  const createdBy = useCallCreatedBy();
  const participants = useParticipants();

  const { hasPermission, requestPermission } = useRequestPermission(
    OwnCapability.SEND_AUDIO
  );

  const createdByName = createdBy?.name || "Unknown";

  return (
    <div className="room container mx-auto p-4 md:p-6 flex flex-col items-center gap-8 animate-fade-in">
      {/* Header */}
      <div className="room-header text-center w-full max-w-3xl animate-slide-up">
        <div className="flex justify-center mb-4">
          <img
            src="/logo-color.svg"
            alt="DudeSpaces"
            className="w-16 h-16 glow animate-glow"
          />
        </div>
        <h2 className="title" style={{ fontFamily: 'Summer Outfit' }}>
          {customData?.title ?? "Session Space"}
        </h2>
        <p className="description mt-2">
          {customData?.description ?? "The crew is here"}
        </p>
        <div className="flex justify-center items-center gap-4 mt-4 text-gray-400">
          <p className="participation-count">
            {participants.length} legends connected
          </p>
          <span className="text-gray-600">•</span>
          <p className="text-sm">
            Created by <span className="font-semibold text-gray-300">{createdByName}</span>
          </p>
        </div>
      </div>

      {/* Participants */}
      <div className="w-full max-w-4xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Participants />
      </div>

      {/* Permission Requests (only for room creator) */}
      {user?.username === createdBy?.id && (
        <div className="w-full max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <PermissionRequestPanel />
        </div>
      )}

      {/* Controls */}
      <div className="controls-panel glass animate-slide-up" style={{ animationDelay: '0.4s' }}>
        {hasPermission ? (
          <Controls />
        ) : (
          <Button
            onClick={requestPermission}
            className="btn-secondary text-lg px-8 py-4"
          >
            <span className="mr-3 text-xl">✋</span>
            Request to Speak
          </Button>
        )}
      </div>
    </div>
  );
};
