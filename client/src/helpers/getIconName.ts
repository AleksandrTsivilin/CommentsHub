import { IconDefinition, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconType } from '../types/iconType';



export const getIconName = (icon: IconType): IconDefinition => {
    switch (icon) {
        case 'back' :
            return faArrowLeft;

        case 'close' : 
            return faXmark
    }
}