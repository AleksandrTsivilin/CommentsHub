import { useNavigate } from 'react-router-dom';
import { CommentsTable } from '../../components/CommentsTable';
import { Button } from '../../components/utils/Button';
import { PageLayout } from '../../components/Layout/PageLayout';
import './CommentsPage.css';


export const CommentsPage = () => {
    const navigate = useNavigate();

    return (
        
            <PageLayout title='Comments' isHomPage={true}>                    
                <div className='CommentsPage'>
                    <div className='CommentsPage__action-block'>
                        <Button 
                            text='add comment' 
                            onClick={() => navigate('/new-comment')} 
                            position='end'
                        />
                    </div>
                    
                    <CommentsTable />
                </div>
            </PageLayout>
        
    )
}