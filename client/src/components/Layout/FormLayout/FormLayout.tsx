import { FC } from 'react';
import './FormLayout.css';
import { Loader } from '../../utils/Loader';

interface Props {
    isLoading: boolean,
    children: React.ReactElement
}

export const FormLayout: FC<Props> = ({isLoading,children}) => {
    return (
        <div className='FormLayout'>
            <div className='FormLayout__loader'>
                {isLoading && <Loader />}
            </div>

            {children}
        </div>
    )
}