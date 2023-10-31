import { NotifyStatus } from '../Context/NotifyContext/NotifyContext';

export interface NotifyState {
    message: string,
    status: NotifyStatus, 
  }