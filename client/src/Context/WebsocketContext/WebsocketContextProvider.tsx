import React, {FC, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Props as WebSocketStateProps, WebsocketContext} from './WebsocketContext';
import { RECONNECT_DELAY } from "../../constants/constants";
import { CommentInfo } from "../../types/commentInfo";
import { localStorageHelper } from "../../helpers/localStorageHelper";

const apiPORT = process.env.REACT_APP_API_PORT;
const apiURL = process.env.REACT_APP_API_URL 
  ? process.env.REACT_APP_API_URL.replace('https', 'wss') 
  : `ws://localhost:${apiPORT}`;

interface Props {
    children: React.ReactNode
}

export const WebsocketProvider: FC<Props> = memo(({children}) => {

    const [isReady, setIsReady] = useState(false);
    const [comment, setComment] = useState<CommentInfo | null>(null);
  
    const ws = useRef<WebSocket | null>(null);
  
    const connect = useCallback(() => {
      const socket = new WebSocket(apiURL);
      
      socket.onopen = () => setIsReady(true);
      socket.onclose = () => {
        setIsReady(false); 
        setTimeout(()=>{connect()}, RECONNECT_DELAY); 
      }
      socket.onmessage = (event) => { 
          const data = event.data;
          const parsedData = JSON.parse(data);
          if (parsedData.type === 'info') {
            localStorageHelper.setItem("CONNECTION_ID", parsedData.connectionId);
            return;
          }
          setComment(parsedData)
      };
  
      ws.current = socket;

      window.addEventListener('beforeunload', () => {
        socket.close();
      });
  
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