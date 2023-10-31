import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext/useAuthContext';
import { Button } from '../utils/Button';
import './Header.css';

export const Header = () => {
    const { isAuth, setIsAuth, userName } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div className='Header'>
            <Link to='/' className='Header__logo'>
                Comments
            </Link>
            
            <div className='Header__actions'>
                {isAuth && <p>Hello {userName}</p>}
                {isAuth 
                    ? ( <Button text='sign out' onClick={() => setIsAuth(false)} /> ) 
                    : ( <Button text='sign in' onClick={() => {navigate('/login')} } /> )}
            </div>
            
        </div>
    )
}