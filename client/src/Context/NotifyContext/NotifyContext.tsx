import { createContext } from 'react';
import { NotifyState } from '../../types/NotifyState';

export type NotifyStatus = null | 'error' | 'success' 



export interface Props {
  notifyState: NotifyState,
  setNotifyState: (state: NotifyState) => void
}

export const initialNotifyState: NotifyState = {
  message: '',
  status: null
}

export const NotifyContext = createContext<Props>({
    notifyState: initialNotifyState,
    setNotifyState: () => {}
    }
);