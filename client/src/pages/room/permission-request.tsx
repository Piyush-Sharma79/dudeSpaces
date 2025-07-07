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

  if(permissionRequests.length===0)return;
  return (
  <div className="permission-request">
    <h4>Permission Requests</h4>
    {permissionRequests.map((request)=>(
        <div className="permission-request" key={request.user.id}>
        <span>
            {request.user.name} requested to {request.permissions.join(", ")}

        </span>
        <button onClick={()=>handlePermissionRequest(request,true)}>Accept</button>
        <button onClick={()=>handlePermissionRequest(request,false)}>Reject</button>
        </div>
    ))}
  </div>
  );
};
