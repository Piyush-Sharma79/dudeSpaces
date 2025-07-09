import { PermissionRequestEvent } from "@stream-io/video-react-sdk";
import { useState, useEffect, useCallback } from "react";
import { useCall } from "@stream-io/video-react-sdk";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export const PermissionRequestPanel = () => {
  const [permissionRequests, setPermissionRequests] = useState<PermissionRequestEvent[]>([]);
  const call = useCall();

  useEffect(() => {
    return call?.on("call.permission_request", (event) => {
      const request = event as PermissionRequestEvent;
      setPermissionRequests((prev) => [...prev, request]);
    });
  }, [call]);

  const handlePermissionRequest = useCallback(async (request: PermissionRequestEvent, accept: boolean) => {
    const { user, permissions } = request;
    try {
      if (accept) {
        await call?.grantPermissions(user.id, permissions);
      } else {
        await call?.revokePermissions(user.id, permissions);
      }
      setPermissionRequests((prev) => prev.filter((r) => r !== request));
    } catch (err) {
      alert("Error processing permission request");
    }
    setPermissionRequests((prev) => prev.filter((r) => r.user.id !== request.user.id));
  }, [call]);

  if (permissionRequests.length === 0) return null;

  return (
    <Card className="bg-[#0C0C14]/80 border-[#92FF58]/10 animate-slide-up overflow-hidden">
      <CardHeader className="px-8 py-6 border-b border-[#92FF58]/10">
        <CardTitle className="text-xl font-acorn font-light text-center">
          Permission Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {permissionRequests.map((request) => (
          <div
            key={request.user.id}
            className="bg-[#12121C]/80 rounded-lg p-6 border border-[#92FF58]/10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <span className="font-space-grotesk text-white/90 text-lg">
                <span className="font-medium text-[#92FF58]">{request.user.name}</span> wants to
                <span className="font-medium text-white ml-1">
                  {request.permissions.map(p => p.replace('send_', '')).join(", ")}
                </span>
              </span>
              <div className="flex gap-3 mt-2 md:mt-0">
                <Button
                  onClick={() => handlePermissionRequest(request, true)}
                  className="bg-[#152515] text-[#92FF58] border-[#92FF58]/30 hover:bg-[#1A2A1A] hover:border-[#92FF58]/50 px-5 py-2.5"
                  variant="secondary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Allow
                </Button>
                <Button
                  onClick={() => handlePermissionRequest(request, false)}
                  className="bg-[#251515] text-red-400 border-red-500/30 hover:bg-[#301515] hover:border-red-500/50 px-5 py-2.5"
                  variant="secondary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Deny
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
