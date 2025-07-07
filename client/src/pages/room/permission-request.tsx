import { PermissionRequestEvent } from "@stream-io/video-react-sdk";
import { useState ,useEffect, useCallback} from "react";
import { useCall } from "@stream-io/video-react-sdk";


export const PermissionRequestPanel = () => {
    const [permissionRequests,setPermissionRequests] = useState<PermissionRequestEvent[]>([]);
    const call = useCall();
    useEffect(()=>{
        return call?.on("call.permission_request",(event)=>{
            const request = event as PermissionRequestEvent;
            setPermissionRequests((prev)=>[...prev,request]);
        })
    },[call])
    const handlePermissionRequest = useCallback(async (request: PermissionRequestEvent, accept: boolean) => {
        const {user , permissions} = request;
        try{
        if(accept){
            await call?.grantPermissions(user.id,permissions);
        }else{
            await call?.revokePermissions(user.id,permissions);
        }
        setPermissionRequests((prev)=>prev.filter((r)=>r !== request));
        }catch(err){
alert("error");
        }
        setPermissionRequests((prev)=>prev.filter((r)=>r.user.id !== request.user.id));
    },[call]);

  if(permissionRequests.length===0)return null;
  
  return (
    <div className="space-y-6 animate-slide-up">
      <h4 className="text-2xl font-bold text-center gradient-text">
        Permission Requests
      </h4>
      {permissionRequests.map((request)=>(
        <div className="permission-request" key={request.user.id}>
          <div className="flex items-center justify-between">
            <span className="text-lg">
              <span className="text-yellow-400 font-bold">{request.user.name}</span> wants to <span className="text-green-400">{request.permissions.join(", ")}</span>
            </span>
            <div className="flex gap-4">
              <button 
                onClick={()=>handlePermissionRequest(request,true)}
                className="btn bg-green-500/20 border-green-500/40 hover:bg-green-500/30 px-6 py-3 text-green-300 font-semibold"
              >
                ✓ Allow
              </button>
              <button 
                onClick={()=>handlePermissionRequest(request,false)}
                className="btn-secondary bg-red-500/20 border-red-500/40 hover:bg-red-500/30 px-6 py-3 text-red-300 font-semibold"
              >
                ✗ Deny
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
