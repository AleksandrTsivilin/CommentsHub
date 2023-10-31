import React, {FC, memo, useMemo, useState} from 'react';
import {NotifyContext, Props as ErrorStateProps, initialNotifyState} from './NotifyContext';
import { NotifyState } from '../../types/NotifyState';



interface Props {
    children: React.ReactNode
}

export const NotifyProvider: FC<Props> = memo(({children}) => {

    const [notifyState, setNotifyState] = useState<NotifyState>(initialNotifyState);

 
    const value: ErrorStateProps = useMemo(() => ({
        notifyState,
        setNotifyState
      }), [notifyState]);
  
    
      
    return (
        <NotifyContext.Provider value={value}>
            {children}
        </NotifyContext.Provider>
    );
})