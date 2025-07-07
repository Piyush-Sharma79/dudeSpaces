import {StreamClient} from "@stream-io/node-sdk"
import dotenv from "dotenv"
dotenv.config()
const API_KEY="hyfhuskn2cs3";
const API_SECRET="um98pvqvsmg6nzcqutxtm49c4a2yhyh5ysbjfvdgm4m47saxaff4avdu4jryct23"
export const client = new StreamClient(API_KEY, API_SECRET);
