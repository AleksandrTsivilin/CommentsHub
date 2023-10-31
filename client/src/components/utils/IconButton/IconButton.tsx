import { FC } from 'react'
import { getIconName } from '../../../helpers/getIconName';
import { IconType } from '../../../types/iconType';
import { IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames'
import './IconButton.css';

type Props = {
    icon: IconType
    position?: 'start' | 'center' | 'end',
    iconSize?: 'sm' | 'md' | 'lg',
    color?: string,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton: FC<Props> = ({
    icon,
    position, 
    iconSize='md',
    color,
    ...buttonAttrs
}) => {
    const iconName: IconDefinition = getIconName(icon);
    
    return (
        <div className={classNames('IconButton-container', {
            'start': position === 'start',
            'center': position === 'center',
            'end': position === 'end',
        })}>
            <button 
                className={classNames('IconButton', `IconButton-${iconSize}`, `IconButton-${color}`, {
                    'full': !position,
                })}
                {...buttonAttrs}
            >

                <FontAwesomeIcon 
                    icon={iconName} 
                    className={classNames(
                        `IconButton-${color}`

                    )}
                />
            </button>
        </div>
    )
}
