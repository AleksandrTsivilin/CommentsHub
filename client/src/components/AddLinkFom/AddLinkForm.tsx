import { FC, useState } from 'react';
import { Button } from '../utils/Button'
import { TextField } from '../utils/TextField'
import { IconButton } from '../utils/IconButton';
import './AddLinkForm.css';


interface Props {
    onClose: () => void
    onSave: (link: string) => void
}

export const AddLinkForm: FC<Props> = ({onClose, onSave}) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [urlError, setUrlError] = useState(false);


    const saveLink = () => {
        if (!title.trim() || !url.trim()) {
            setTitleError(!title);
            setUrlError(!url);
            return;
        }
        onSave(`<a href='${url}' alt='${title}'>${title}</a>`);
        onClose();

    }

    return (
        <div className='AddLinkForm__container'>                                                
            <div className=''>
                <IconButton type='button' icon='close' position='end' iconSize='sm' color='red' onClick={onClose} />
                
                <TextField
                    label='title'
                    name='title'
                    placeholder='Enter title'
                    fieldSize='sm'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    invalid={titleError}
                    onBlur={() => {setTitleError(!title)}}
                />
                {titleError && <p className='AddLinkForm__error'>title is required</p>}

                <TextField 
                    label='url'
                    name='url'
                    placeholder='Enter url'   
                    fieldSize='sm'  
                    onChange={(e) => setUrl(e.target.value)}    
                    value={url}  
                    invalid={urlError}
                    onBlur={() => {setUrlError(!url)}}                                          
                />
                {urlError && <p className='AddLinkForm__error'>url is required</p>}


                <Button
                    text='add link'
                    type='button'
                    buttonSize='sm'
                    onClick={saveLink}
                />
            </div>
        </div>
    )
}

