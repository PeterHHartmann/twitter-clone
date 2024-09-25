import style from '@styles/pages/auth/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC, FormEvent, useEffect, useState } from 'react';
import { AuthLayout } from '@layouts/AuthLayout';
import { useRouter } from 'next/router';
import { getAdminSession, getCsrfToken } from '@lib/auth';
import { FormInput } from '@components/form/FormInput';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getAdminSession(req);
    if (session) return { redirect: { destination: '/admin', permanent: true } };
    const csrfToken = getCsrfToken(req, res);
    return { props: { csrfToken: csrfToken } };
};

export const AdminSignIn: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [serverError, setServerError] = useState('');
    const [serverInputError, setServerInputError] = useState<string | boolean | null>(null);
    const { reload } = useRouter();

    useEffect(() => {
        return () => setServerInputError(null);
    }, [username, password]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/admin/signin', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-csrf-token': csrfToken,
                },
                body: JSON.stringify({
                    csrfToken: csrfToken,
                    username: username,
                    password: password,
                }),
            });
            if (response.ok) {
                reload();
            } else {
                const { error } = await response.json();
                setServerInputError(true);
                setServerError(error as string);
            }
        } catch (err) {
            setServerError('Something went wrong. Please try again later');
        }
    };

    return (
        <>
            <AuthLayout>
                <form className={style.form} action='/signin' method='post' autoComplete='off' onSubmit={handleSubmit}>
                    <h1 className={style.heading}>Admin Sign in</h1>
                    {serverError ? <span className={style.error}>{serverError}</span> : null}
                    <FormInput
                        name='username'
                        type='username'
                        value={username}
                        setValue={setUsername}
                        serverError={serverInputError}
                        required={true}
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        setValue={setPassword}
                        serverError={serverInputError}
                        required={true}
                    />
                    <button className={style.button} type='submit'>
                        Sign in
                    </button>
                </form>
            </AuthLayout>
        </>
    );
};

export default AdminSignIn;
