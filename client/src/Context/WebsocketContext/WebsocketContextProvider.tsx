import React, {FC, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Props as WebSocketStateProps, WebsocketContext} from './WebsocketContext';
import { RECONNECT_DELAY } from "../../constants/constants";

const apiPORT = process.env.REACT_APP_API_PORT;

interface Props {
    children: React.ReactNode
}

export const WebsocketProvider: FC<Props> = memo(({children}) => {

    const [isReady, setIsReady] = useState(false);
    const [comment, setComment] = useState(null);
  
    const ws = useRef<WebSocket | null>(null);
  
    const connect = useCallback(() => {
      const socket = new WebSocket(`ws://localhost:${apiPORT}`);
  
      socket.onopen = () => setIsReady(true);
      socket.onclose = () => {
        setIsReady(false); 
        setTimeout(()=>{connect()}, RECONNECT_DELAY); 
      }
      socket.onmessage = (event) => { setComment(event.data)};
  
      ws.current = socket;
  
    }, []);


    useEffect(() => {
      connect();
      
      return () => {
        ws.current?.close();
      };
    }, [connect]);

    const value: WebSocketStateProps = useMemo(() => ({
        isReady,
        comment,
        send: ws.current?.send.bind(ws.current)
      }), [isReady, comment]);
  
    
      
    return (
        <WebsocketContext.Provider value={value}>
            {children}
        </WebsocketContext.Provider>
    );
})