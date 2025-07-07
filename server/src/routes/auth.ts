import {Router} from 'express';
import { Response,Request } from 'express';
import {client} from "../stream-client";
import { UserRequest } from "@stream-io/node-sdk";
const router =Router();


router.post("/createUser",async (req:Request,res:Response):Promise<any>=>{
    const {username,name,image} = req.body;

    if(!username || !name || !image){
        return res.status(400).json({message:"Required fields were empty"})
    }
    const newUser : UserRequest={
        id:username,
        role:"user",
        name,
        image,
    }
    const user=await client.upsertUsers([newUser])
    const expiry = Math.floor(Date.now()/1000)+24*60*60;
    const token = client.generateUserToken({user_id:username,validity_in_seconds:expiry});
    return res.status(200).json({token,username,name});

});
export default router;