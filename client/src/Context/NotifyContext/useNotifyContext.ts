import { useContext } from 'react';
import { NotifyContext } from './NotifyContext';

export const useNotifyContext = () => useContext(NotifyContext);