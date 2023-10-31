import { FC } from 'react';
import { TextField } from '../TextField';
import { CaptchaImage } from '../CaptchaImage';
import './Captcha.css';

type Props = {
    label?: string,  
    name: string,
    placeholder?: string,
    invalid?: boolean,
    reload?: {}
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const Captcha: FC<Props> = ({
    label,
    name,
    placeholder,
    invalid=false,
    reload,
}) => {
    
    return (
        <div className='Captcha-container'>
            <div className='Captcha__input'>
                <TextField 
                    id='captcha'
                    label={label}
                    type='text'
                    placeholder={placeholder}
                    name={name}
                    invalid={invalid}
                />
            </div>            
            
            <div className='Captcha__svg-container'>
                <label className='Captcha__svg-label'>
                    code
                </label>

                {<CaptchaImage reload={reload}/>}
            </div>
        </div>
    )
}