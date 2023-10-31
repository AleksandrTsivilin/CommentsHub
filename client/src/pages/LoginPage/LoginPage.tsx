import { useState } from 'react';
import { PageLayout } from '../../components/Layout/PageLayout/PageLayout';
import { AuthForm } from '../../components/AuthForm';

export const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <PageLayout title={isRegister ? 'Register' : 'Login'}>
            <AuthForm isRegister={isRegister} setIsRegister={(state) => setIsRegister(state)}/>
        </PageLayout>
    )
}
