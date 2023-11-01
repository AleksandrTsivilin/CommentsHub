import { FC, useEffect } from 'react';
import { NotifyStatus } from '../../Context/NotifyContext/NotifyContext';
import { IconButton } from '../utils/IconButton';
import classNames from 'classnames';
import './Notify.css';

interface Props {
    message?: string,
    status?: NotifyStatus,
    onClose?: () => void,
    children?: React.ReactElement
}

export const Notify: FC<Props> = ({message, status, onClose, children}) => {

    useEffect(() => {
        if (!onClose) {
            return;
        }
        const timerId = setTimeout(() => {
            onClose();
        }, 2000)

        return  () => {
            clearTimeout(timerId);
        }
    }, [onClose]);
    
    return (
        <div className={classNames('Notify__wrapper', {
            'error-color': status === 'error',
            'success-color': status === 'success',
            'warning-color': status === 'warning',
            'isActive': message?.length || children
        })}>
           {message && <p className='single-line-text'>{message}</p>}
           {children}
           {onClose && <div className='Notify__close'>
                <IconButton icon='close' color='red' position='end' iconSize='sm' onClick={onClose}/>
           </div>}
        </div>
    )
}