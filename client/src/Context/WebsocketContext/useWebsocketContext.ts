import { useContext } from "react";
import { WebsocketContext } from "./WebsocketContext";

export const useWebsocketContext = () => useContext(WebsocketContext);