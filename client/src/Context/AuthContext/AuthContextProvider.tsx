import React, {FC, memo, useMemo, useState} from "react";
import {Props as AuthStateProps, AuthContext} from './AuthContext';



interface Props {
    children: React.ReactNode
}

export const AuthProvider: FC<Props> = memo(({children}) => {

    const [isAuth, setIsAuth] = useState(false);
    const [userName, setUserName] = useState<string>('');

 
    const value: AuthStateProps = useMemo(() => ({
        isAuth,
        setIsAuth,
        userName, 
        setUserName
      }), [ isAuth, userName]);
  
    
      
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
})