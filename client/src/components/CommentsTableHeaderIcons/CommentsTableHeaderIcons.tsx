import { FC } from 'react';
import { SearchLink } from '../utils/SearchLink';
import { SortOptions } from '../../types/sortOptions';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CommentsTableHeaderIcons.css';


interface Props {
    name: string,
    sortOptions: SortOptions
}

export const CommentsTableHeaderIcons: FC<Props> = ({name, sortOptions}) => {
    const state = {
        sortBy: name !== sortOptions.sortBy ||  (name === sortOptions.sortBy && !sortOptions.orderBy) ? name : null,
        orderBy: name === sortOptions.sortBy && !sortOptions.orderBy ? 'desc':  null
    };

    
    return (
        <SearchLink params={{sortBy: state.sortBy, orderBy: state.orderBy}} >
            <span className="Comments-Table__header-icon">
                {sortOptions?.sortBy !== name && <FontAwesomeIcon icon={faSort} style={{color: "#fff",}} />}
                {!sortOptions?.orderBy && sortOptions?.sortBy === name && <FontAwesomeIcon icon={faSortUp} style={{color: '#fff',}} />}
                {sortOptions?.orderBy && sortOptions.sortBy === name && <FontAwesomeIcon icon={faSortDown} style={{color: '#fff',}} />}            
            </span>
        </SearchLink>
    )
}