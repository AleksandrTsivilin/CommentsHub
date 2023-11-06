import { FC, useState } from "react";
import { Form, Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useAuthContext } from "../../Context/AuthContext/useAuthContext";
import { useNotifyContext } from "../../Context/NotifyContext/useNotifyContext";
import { login, register } from "../../api/userApi";
import { Button } from "../utils/Button"
import { Captcha } from "../utils/Captcha"
import { TextField } from "../utils/TextField"
import { getTokenData } from "../../helpers/jwt";
import { TokenData } from "../../types/tokenData";
import { UserAuthAttrs } from "../../types/userAuthAttrs";
import './AuthForm.css';
import { isNotWhitespace } from "../../helpers/isNotWhitespace";
import { FormLayout } from "../Layout/FormLayout";

interface Props {
    isRegister: boolean,
    setIsRegister: (state: boolean) => void
}

export const AuthForm: FC<Props> = ({isRegister, setIsRegister}) => {

    const {setIsAuth, setUserName} = useAuthContext();
    const {setNotifyState} = useNotifyContext();
    const [reloadCaptcha, setReloadCaptcha] = useState({})
    const navigate = useNavigate();
    
    const initialValues = {
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        captcha: '' 
    }

    const validationSchema = isRegister ? Yup.object({
        email: Yup.string().required('Email is required').email('email invalid'),
        userName: isNotWhitespace('User name').required('User name is required').min(3),
        password: Yup.string().required('Password is required').min(3),
        captcha: Yup.string().required('enter code'),
        confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Passwords must match')
    }) : Yup.object({
        email: Yup.string().required('Email is required').email('email invalid'),
        password: Yup.string().required('Password is required'),
        captcha: Yup.string().required('enter code'),
    }) ;

    const submitHandler = async (values: any, actions: any) => {   
        try{
            const token = await auth(isRegister, {...values});
            const tokenData: TokenData = getTokenData(token.data.token);
            localStorage.setItem('token', JSON.stringify(token.data.token));
            setUserName(tokenData.userName);
            setIsAuth(true);
            setNotifyState({
                message: 'User is authenticated successfully',
                status: "success"
            });
            navigate(-1);
        } catch (error: any) {
            setNotifyState({
                message: error.message,
                status: 'error'
            });
        } finally {
            setReloadCaptcha({});
            actions.resetForm();
        }
    };

    const auth = async (isRegister: boolean, {...userData}: UserAuthAttrs) => {
        if (isRegister) {
            return await register({
                userName: userData.userName!.trim(), 
                email: userData.email.trim(),
                password: userData.password.trim(), 
                captcha: userData.captcha.trim()
            })
        } else {
            return await login({
                email: userData.email.trim(),
                password: userData.password.trim(), 
                captcha: userData.captcha.trim()
            })
        }
    }

    return (       
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
        >
            {formik => (
                <FormLayout isLoading={formik.isSubmitting}>
                    <Form className='AuthForm'>
                        {isRegister && <TextField
                            label='user name'
                            name='userName'
                            placeholder='Enter user name'
                            invalid={!!formik.errors.userName && formik.touched.userName}
                        />}

                        <TextField
                            label='email'
                            name='email'
                            placeholder='Enter email'
                            invalid={!!formik.errors.email && formik.touched.email}
                        />

                        <TextField
                            label='password'
                            name='password'
                            type='password'
                            placeholder='Enter password'
                            invalid={!!formik.errors.password && formik.touched.password}
                        />

                        {isRegister && (
                            <TextField
                                label='confirm password'
                                name='confirmPassword'
                                placeholder='Enter confirm password'
                                type='password'
                                invalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                            />)}                         

                        <Captcha 
                            label='enter code'
                            name='captcha'
                            placeholder='Enter code'
                            reload={reloadCaptcha}
                            invalid={!!formik.errors.captcha && formik.touched.captcha}
                        />

                        <label className='AuthForm__checkbox'>
                            <input
                                type='checkbox'
                                checked={isRegister}
                                onChange={(e) => setIsRegister(e.target.checked)}
                            />
                            I don't have an account. Create account.
                        </label>

                        <Button
                            text={isRegister ? 'sign up' : 'sign in'}
                            type='submit'
                            disabled={formik.isSubmitting}
                        />
                    </Form>
                </FormLayout>
            )}
        </Formik>        
        
    )
}