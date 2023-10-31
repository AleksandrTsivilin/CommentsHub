import jwt_decode from "jwt-decode";
import { TokenData } from "../types/tokenData";

export const getTokenData = (token: string) => {
    return jwt_decode(token) as TokenData;     
}
 