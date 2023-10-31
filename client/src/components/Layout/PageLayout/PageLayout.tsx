import { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../Context/AuthContext/useAuthContext'
import { useNotifyContext } from '../../../Context/NotifyContext/useNotifyContext'
import { Title } from '../../utils/Title'
import { IconButton } from '../../utils/IconButton'
import { Notify } from '../../Notify'
import './PageLayout.css'

interface Props {
    title: string,
    isHomPage?: boolean
    children: React.ReactElement

}

export const PageLayout: FC<Props> = ({title, isHomPage=false, children}) => {
    const navigate = useNavigate();
    const { notifyState ,setNotifyState} = useNotifyContext();
    const {isAuth} = useAuthContext();
    
    useEffect(() => {
        document.title  = isHomPage ? 'Comments' : `Comments | ${title}`;
    }, [title, isHomPage]);

    const breadCrumbsHandler = useCallback(() => {
        isAuth ? navigate(-1) : navigate('/');
    }, [isAuth, navigate]);
    
    return (
        <div className='PageLayout'>
            <div className='PageLayout__title'>
                <Title title={title} />  
            </div>    

            <div className='PageLayout__breadcrumbs'>
                {!isHomPage && <IconButton icon='back' position='start' iconSize='sm' color='gray' onClick={breadCrumbsHandler} />}
            </div>

            <div className='PageLayout__notify'>
                {!!notifyState.message && <Notify message={notifyState.message} status={notifyState.status} onClose={() => setNotifyState({
                    message: '',
                    status: null
                })}/>}
            </div>

            {children}
        </div>
    )
}