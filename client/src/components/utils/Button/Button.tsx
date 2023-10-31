import { FC } from 'react'
import classNames from 'classnames'
import './Button.css';

type Props = {
    text?: string,
    children?: React.ReactElement
    position?: 'start' | 'center' | 'end',
    buttonSize?: 'sm' | 'md' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<Props> = ({
    text, 
    position, 
    children,
    buttonSize='md',
    ...buttonAttrs
}) => {
    return (
        <div className={classNames('Button-container', {
            'start': position === 'start',
            'center': position === 'center',
            'end': position === 'end',
        })}>
            <button 
                className={classNames('Button', {
                    'full': !position,
                    'Button-sm': buttonSize === 'sm',
                    'Button-md': buttonSize === 'md',
                    'Button-lg': buttonSize === 'lg'
                })}
                {...buttonAttrs}
            >
                {text || children}
            </button>
        </div>
    )
}