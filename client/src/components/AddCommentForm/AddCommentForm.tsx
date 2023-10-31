import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { create } from '../../api/commentsApi';
import { useNotifyContext } from '../../Context/NotifyContext/useNotifyContext';
import { Button } from '../../components/utils/Button';
import { Captcha } from '../../components/utils/Captcha';
import { Loader } from '../../components/utils/Loader';
import { TextField } from '../../components/utils/TextField';
import {QuillField} from '../../components/utils/QuillField';
import './AddCommentForm.css';
import { isNotWhitespace } from '../../helpers/isNotWhitespace';

interface Props {
    parentCommentId?: string
}


export const AddCommentForm: FC<Props> = ({parentCommentId}) => {

    const {setNotifyState} = useNotifyContext();
    const [file, setFile] = useState<any>(null);
    const navigate = useNavigate();
    const [reloadCaptcha, setReloadCaptcha] = useState({});   
    
    const initialValues = {
        text: '',
        homePage: '',
        captcha: '' 
    }

    const validationSchema =  Yup.object({
        text: isNotWhitespace('text').required('text is required'),
        captcha: Yup.string().required('enter code'),
        homePage: Yup.string().url('Url invalid'),
    }) ;


    const submitHandler = async (values: any, actions: any) => {
        try {
            const formData = new FormData();
            formData.append('text', values.text.trim());
            formData.append('captcha', values.captcha.trim())
            if (file) {
                formData.append('file', file);
            }

            if (parentCommentId) {
                formData.append('parentId', parentCommentId);
            }

            if (values.homePage) {
                formData.append('homePage', values.homePage.trim());
            }

            await create(formData);
            setNotifyState({
                message: 'Comment has been added successfully',
                status: 'success'
            })
            navigate(-1);
        } catch (error: any) {
            setNotifyState({
                message: error.message,
                status: 'error'
            })
        } finally {
            actions.resetForm();
            setReloadCaptcha({});
            setFile(null);
        }
    }




    return (           
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema} 
            onSubmit={submitHandler}                
        >
            {formik => (

                <>
                    <div className='AddCommentForm__loader-wrapper'>
                        {formik.isSubmitting && <Loader />}
                    </div>

                    <div className='AddCommentForm__container'>                                                
                        <Form className='AddCommentForm'>

                            <QuillField 
                                label="Leave your comment" 
                                onChangeFileInput={setFile} 
                                file={file}
                                name='text' 
                            />

                            <TextField
                                label='home page'
                                name='homePage'
                                placeholder='Enter url home page'
                                invalid={!!formik.errors.homePage && formik.touched.homePage}
                            />


                            <Captcha 
                                label='enter code'
                                name='captcha'
                                placeholder='Enter code'
                                invalid={!!formik.errors.captcha && formik.touched.captcha}
                                reload={reloadCaptcha}
                            />

                            <Button
                                text='add comment'
                                type='submit'
                                disabled={formik.isSubmitting}
                            />
                        </Form>
                    </div>
                </>
            )}
        </Formik>
    )
}
