import { createContext } from 'react';


export interface Props {
    isReady: boolean,
    comment: any,
    send: ((messageInfo: any) => void) | undefined,
}

export const WebsocketContext = createContext<Props>({
        isReady: false,
        comment: undefined,
        send: () => {}
    }
);