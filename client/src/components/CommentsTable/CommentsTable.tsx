import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { useWebsocketContext } from '../../Context/WebsocketContext/useWebsocketContext';
import { useNotifyContext } from '../../Context/NotifyContext/useNotifyContext';
import { getComments } from '../../api/commentsApi';
import { CommentInfo } from '../../types/commentInfo';
import { Loader } from '../utils/Loader';
import { CommentsTableHeader } from '../CommentsTableHeader';
import { Pagination } from '../Pagination';
import './CommentsTable.css';


export const CommentsTable = () => {
    const {setNotifyState} = useNotifyContext();
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<CommentInfo []>([]);
    const [total, setTotal] = useState(1);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {comment} = useWebsocketContext();

    useEffect(() =>{
        if (!comment) {
            return;
        }
        setComments(prev => [comment, ...prev]);
    }, [comment])


    useEffect(() => {
        const sortBy = searchParams.get('sortBy') || undefined;
        const orderBy = searchParams.get('orderBy') || undefined;
        const page = searchParams.get('page') || undefined;
        const limit = searchParams.get('limit') || undefined;

        setIsLoading(true);
        getComments({sortBy, orderBy, page, limit})
            .then(response => {
                setComments(response.data.rows)
                setTotal(response.data.count);
            })
            .catch(err => setNotifyState({
                message: err.message,
                status: 'error'
            }))
            .finally(() => setIsLoading(false));
    }, [searchParams, setNotifyState]);

    if (isLoading) {
        return (
            <div className='Comments-Table__loader'>
                <Loader />
            </div>
        )
    }

    if (comments.length === 0 && !isLoading) {
        return (
            <p className='Comments-Table__message'>No comments</p>
        )
    }

    const clickRowsHandler = (id: number) => {
        navigate(`/${id}`);
    }
     
    return (  
        <>
            <table className="Comments-Table">
                <CommentsTableHeader />
                <tbody>
                    {comments.map(comment => { 
                        const html = comment.text; 
                        const date = moment(comment.createdAt).format('MMMM DD YYYY');
                        return (
                            <tr key={comment.id} className="Comments-Table__rows" onClick={() => clickRowsHandler(comment.id)}>                        
                                <td className='Comments-Table__ceil'>
                                    <p dangerouslySetInnerHTML={{ __html: html }} className='Comments-Table__comment'></p>
                                </td>
                                <td className='Comments-Table__ceil'>{comment.user.userName}</td>
                                <td className='Comments-Table__ceil'>{comment.user.email}</td>
                                <td className='Comments-Table__ceil'>{date}</td>                       
                            </tr> 
                    )})}
                </tbody>
            </table>

            <Pagination total={total}/>
        </>     
    )
}