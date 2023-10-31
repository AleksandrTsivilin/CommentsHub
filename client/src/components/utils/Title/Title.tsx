import { FC } from 'react';
import './Title.css';

interface Props {
    title: string, 
}

export const Title: FC<Props> = ({title}) => {
    return (
        <div className='Title__container'>
            <h1 className='Title__text'>{title}</h1>
            <hr></hr>
        </div>
    )
}