import './CommentsTableHeader.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CommentsTableHeaderIcons } from '../CommentsTableHeaderIcons';
import { SortOptions } from '../../types/sortOptions';


export const CommentsTableHeader = () => {

    const [ searchParams ] = useSearchParams();
    const [ sortOptions, setSortOptions ] = useState<SortOptions>({});

    
    useEffect(() => {
        const sortBy = searchParams.get('sortBy') || undefined;
        const orderBy = searchParams.get('orderBy') || undefined;

        setSortOptions({sortBy, orderBy })

    }, [searchParams]);



    return (
        <thead>
            <tr className="Comments-Table__header-wrapper">
                <th className="Comments-Table__header Comments-Table__header-comment">
                    Comments
                </th>
                <th className="Comments-Table__header">
                    User name
                    <CommentsTableHeaderIcons 
                        name='username' 
                        sortOptions={sortOptions} 
                    />
                </th>
                <th className="Comments-Table__header">
                    Email
                    <CommentsTableHeaderIcons 
                        name='email'  
                        sortOptions={sortOptions} 
                    />
                </th>
                <th className="Comments-Table__header">
                    Date
                    <CommentsTableHeaderIcons 
                        name='date'  
                        sortOptions={sortOptions} 
                    />
                </th>
            </tr>
        </thead>
    )
}