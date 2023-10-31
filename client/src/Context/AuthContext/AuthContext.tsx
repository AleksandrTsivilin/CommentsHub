import { createContext } from 'react';


export interface Props {
   isAuth: boolean,
   userName: string,
   setUserName: (userName: string) => void,
   setIsAuth: (isAuth: boolean) => void
}

export const AuthContext = createContext<Props>({
        isAuth: false,
        userName: '',
        setUserName: () => {},
        setIsAuth: () => {}
    }
);