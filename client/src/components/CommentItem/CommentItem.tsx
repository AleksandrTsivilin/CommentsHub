import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api';
import { useWebsocketContext } from '../../Context/WebsocketContext/useWebsocketContext';
import { CommentInfo } from '../../types/commentInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faFileLines } from '@fortawesome/free-solid-svg-icons';
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js';
import 'lightbox2/dist/css/lightbox.min.css'; 
import './CommentItem.css';

interface Props {
    comment: CommentInfo,
    depth?: number
}

export const CommentItem: FC<Props> = ({comment:initialComment , depth = 0}) => {
    const navigate = useNavigate();
    const shift = depth * 50;
    const { comment: newComment } = useWebsocketContext();
    const [ comment, setComment ] = useState(initialComment);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {

        if (!isMounted) {
            setIsMounted(true);
            return;
        }

        if (!newComment) {
            return;
        }
        
        setComment(prev => {
            if (prev.id !== newComment.parentId) {
                return prev;
            }

            const commentWithParent = {...newComment, parent: {text: prev.text}};

            const updatedChildren = prev.children 
                ? [commentWithParent, ...prev.children] 
                : [commentWithParent];

            return  {
                ...prev,
                children: updatedChildren,
            }
        });           
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newComment]);

    
    return (
        <div style={{paddingLeft: `${shift}px`}}>
            <div className='CommentItem__actions'>
                <div className='CommentItem__actions-user'>
                    {comment.user.userName}
                </div>

                <FontAwesomeIcon className='CommentItem__icon' icon={faCommentDots} onClick={() => navigate('/new-comment', {
                    state: {
                    parentId: comment?.id,
                    parentText: comment?.text
                    }
                })}/>
            </div>
            {comment.parent && (
                <p 
                    className='CommentItem__parent'
                    dangerouslySetInnerHTML={{ __html: comment.parent.text }}
                ></p>)}
            <p dangerouslySetInnerHTML={{ __html: comment.text }} className='CommentItem__text'></p>
            <div className='CommentItem__file-wrapper'>
                {comment.fileUrl && <div className='Comment__file'>
                    {comment.fileUrl.split('.')[1] === 'txt' ? (
                        <a 
                            href={`${BASE_URL}/${comment.fileUrl}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className='CommentItem__txt'
                        >
                            <FontAwesomeIcon icon={faFileLines} style={{color: "#1f2937",}} />
                        </a>
                    ) : (
                        <a
                            href={`${BASE_URL}/${comment.fileUrl}`}
                            data-lightbox="my-gallery"
                            data-title={comment.fileUrl}
                        >   
                            <img className='CommentItem__img' src={`${BASE_URL}/${comment.fileUrl}`} alt={comment.fileUrl}  />
                        </a>
                    )} 
                </div>}
            </div>
            {comment.children?.map(child => {
                depth = 0;
                return (
                    <div key={child.id}>
                        <CommentItem comment={child} depth={depth + 1} />
                    </div>
                )})}
        </div>
    )
}
