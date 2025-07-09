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
    <div className="room container mx-auto p-6 md:p-10 flex flex-col items-center gap-10 animate-fade-in">
      {/* Header */}
      <div className="room-header text-center w-full max-w-3xl pb-6 animate-slide-up">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src="/logo-color.svg"
              alt="DudeSpaces"
              className="w-20 h-20 glow animate-glow"
            />
            <div className="absolute inset-0 bg-[#92FF58]/10 blur-3xl rounded-full -z-10"></div>
          </div>
        </div>
        <h2 className="room-title">
          {customData?.title ?? "Session Space"}
        </h2>
        <p className="room-description mt-3">
          {customData?.description ?? "The crew is here"}
        </p>
        <div className="flex justify-center items-center gap-6 mt-6 text-white/60">
          <div className="participation-count flex items-center gap-2">
            <span className="text-xl text-[#92FF58]">●</span>
            <span className="font-medium">{participants.length} connected</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="text-white/60 font-space-grotesk">
            Created by <span className="font-semibold text-white/90">{createdByName}</span>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="w-full max-w-5xl animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
        <Participants />
      </div>

      {/* Permission Requests (only for room creator) */}
      {user?.username === createdBy?.id && (
        <div className="w-full max-w-3xl animate-slide-up px-4" style={{ animationDelay: '0.3s' }}>
          <PermissionRequestPanel />
        </div>
      )}

      {/* Controls */}
      <div className="controls-panel animate-slide-up px-8 py-4" style={{ animationDelay: '0.4s' }}>
        {hasPermission ? (
          <Controls />
        ) : (
          <Button
            onClick={requestPermission}
            className="btn-secondary text-lg px-8 py-4"
          >
            <span className="mr-3 text-2xl">✋</span>
            Request to Speak
          </Button>
        )}
      </div>
    </div>
  );
};
