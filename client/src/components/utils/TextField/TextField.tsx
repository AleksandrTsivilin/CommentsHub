import { FC } from 'react'
import { ErrorMessage, Field } from 'formik';
import { FormFieldLabel } from '../FormFieldLabel';
import classNames from 'classnames'
import './TextField.css';

type Props = {
    id?: string,
    label?: string,  
    name: string,
    placeholder?: string,
    invalid?: boolean, 
    fieldSize?: 'sm' | 'md' | 'lg'
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const TextField: FC<Props> = ({
    id,
    label,
    name,
    placeholder,
    invalid=false,
    fieldSize='md',
    ...inputAttrs
})  => {
    
    return (
        <div className={`TextField-${fieldSize}`}>

            <FormFieldLabel 
                label={label}
                id={id || name}
                invalid={invalid}
            
            />

            <Field 
                className={classNames(
                    'TextField__input', {
                        'border-red': invalid,
                        'TextField__input-md': fieldSize === 'md',
                        'TextField__input-sm': fieldSize === 'sm'
                    }
                )}

                type='text' 
                id={name} 
                name={name}
                placeholder={placeholder} 
                {...inputAttrs}
            />

            <ErrorMessage 
                className='TextField__error-message error-text-color' 
                name={name} 
                component='div' 
            />
        </div>
    )
}