import { Outlet, Navigate, } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext/useAuthContext';



export const PrivateRoutes = () => {
    const { isAuth } = useAuthContext();
    
    return isAuth ? <Outlet /> : <Navigate to='/login' />;
};