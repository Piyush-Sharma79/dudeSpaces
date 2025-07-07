import {StreamClient} from "@stream-io/node-sdk"
import dotenv from "dotenv"

dotenv.config()

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

if (!API_KEY || !API_SECRET) {
    throw new Error("STREAM_API_KEY and STREAM_API_SECRET must be set in environment variables");
}

export const client = new StreamClient(API_KEY, API_SECRET);
