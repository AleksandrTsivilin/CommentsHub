import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getById } from '../../api/commentsApi';
import { useNotifyContext } from '../../Context/NotifyContext/useNotifyContext';
import { CommentItem } from '../../components/CommentItem';
import { Loader } from '../../components/utils/Loader';
import { PageLayout } from '../../components/Layout/PageLayout';
import { CommentInfo } from '../../types/commentInfo';
import './CommentDetails.css';


export const CommentDetailPage = () => {
    const { pathname } = useLocation();
    const {setNotifyState} = useNotifyContext();
    const [comment, setComment] = useState<CommentInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const id = pathname.slice(1);
        if (id) {
            setIsLoading(true);
            getById(Number(id))
                .then(res =>  setComment(res.data))
                .catch(e => setNotifyState({message: e.message, status: 'error'}))
                .finally(() => setIsLoading(false));
        }
    }, [pathname, setNotifyState]);


    return (
        
        <PageLayout title='Comment details'>
            
            <>
                {isLoading && (
                    <div className="CommentDetails__loader">
                        <Loader />
                    </div>
                )}
                {comment && <CommentItem comment={comment} />}
                {!isLoading && !comment && <p>Comment not found</p>}
            </>
            </PageLayout>

            
    )
}