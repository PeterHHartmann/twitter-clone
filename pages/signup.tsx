import style from '@styles/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { AuthLayout } from '@layouts/AuthLayout';
import Link from 'next/link';
import { getSession, getCsrfToken } from '@lib/auth';
import { FormInput } from '@components/Auth/FormInput';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);
  if (session) return { redirect: { destination: '/', permanent: true } };
  const csrfToken = getCsrfToken(req);
  return { props: { csrfToken: csrfToken } };
};

export const SignUp: FC<InferGetServerSidePropsType<any>> = ({ csrfToken }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverEmailError, setServerEmailError] = useState<string | boolean | null>(null);
  const [serverUsernameError, setServerUsernameError] = useState<string | boolean | null>(null);
  const [serverPasswordError, setServerPasswordError] = useState<string | boolean | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          csrfToken: csrfToken,
          email: email,
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        router.push('/signin');
      } else {
        const { error } = await response.json();
        if (error.target === 'email') {
          setServerEmailError(error.msg);
        } else if (error.target === 'username') {
          setServerUsernameError(error.msg);
        } else if (error.target === 'password') {
          setServerPasswordError(error.msg);
        } else {
          setServerError('Something went wrong. Please try again later');
        }
      }
    } catch (err) {
      setServerError('Something went wrong. Please try again later');
    }
  };

  useEffect(() => {
    return () => {
      setServerEmailError(null);
      setServerUsernameError(null);
      setServerPasswordError(null);
    };
  }, [email, username, password]);

  return (
    <AuthLayout>
      <form className={style.form} action='' method='post' onSubmit={handleSubmit}>
        <h1 className={style.heading}>Join Twitter today</h1>
        {serverError ? <span className={style.error}>{serverError}</span> : null}
        <FormInput name='email' type='email' value={email} setValue={setEmail} serverError={serverEmailError} checkValid={true} />
        <FormInput name='username' type='text' value={username} setValue={setUsername} serverError={serverUsernameError} />
        <FormInput name='password' type='password' value={password} setValue={setPassword} serverError={serverPasswordError} />
        <button className={style.button} type='submit'>
          Sign Up
        </button>
        <span className={style.option}>
          Already have an account?{' '}
          <Link href={'/signin'} prefetch={false}>
            Sign in
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
