import { FC } from 'react'
import classNames from 'classnames'
import './FormFieldLabel.css';

interface Props {
    label?: string,
    id?: string,
    name?:string,
    invalid?:boolean
}

export const FormFieldLabel:FC<Props> = ({
    label, id, name, invalid
}) => {
    return (
        <label 
                htmlFor={id || name}
                className={classNames('Label', {
                    'error-text-color': invalid
                })}
            >
                {label}
            </label>
    )
}