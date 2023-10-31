import client from ".";
import { UserAuthAttrs } from "../types/userAuthAttrs";

const authEndPoint = '/auth';


export const register = async (
    credentials: UserAuthAttrs
) => await client.post(`${authEndPoint}/register`, credentials);

export const login = async (
    credentials: UserAuthAttrs
) => 
    await client.post(`${authEndPoint}/login`, credentials);

