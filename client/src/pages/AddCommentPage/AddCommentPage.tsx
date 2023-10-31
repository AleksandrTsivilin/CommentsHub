import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { PageLayout } from '../../components/Layout/PageLayout';
import { AddCommentForm } from '../../components/AddCommentForm';
import './AddCommentPage.css';

interface Props {
}

export const AddCommentPage: FC<Props> = () => {

    const location = useLocation();
    const [parentCommentId ,setParentCommentId] = useState<string>();
    const [parentCommentText, setParentCommentText] = useState<string>();

    useEffect(() => {

        const state = location.state;
        if (state) {
            setParentCommentId(state.parentId);
            setParentCommentText(state.parentText);
        }
    }, [location]);

    return (
        
        <PageLayout title='Create comment'>
            <div style={{width: '100%'}}>
                {parentCommentText && (
                    <p 
                        dangerouslySetInnerHTML={{ __html: parentCommentText }} 
                        className='AddCommentPage__parentText'
                    ></p>
                )}
                <AddCommentForm parentCommentId={parentCommentId}/>
            </div>
        </PageLayout>
        
    )
}
