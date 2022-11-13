import style from '../styles/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    };
  }
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken: csrfToken,
    },
  };
};

export const SignIn: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <AuthLayout>
      <h1 className={style.heading}>Sign in to Twitter</h1>
      {error && <span>error: {error}</span>}
      <form className={style.form} action='/api/auth/callback/credentials' method='post' autoComplete='off'>
        <input type='hidden' name='csrfToken' defaultValue={csrfToken} autoComplete='off' />
        <label className={style.label} htmlFor='email'>
          <span className={email ? style.spanAfterInput : style.spanNoInput}>Email</span>
          <input className={style.input} name='email' type='text' value={email} onChange={handleEmailChange} required />
        </label>
        <label className={style.label} htmlFor='password'>
          <span className={password ? style.spanAfterInput : style.spanNoInput}>Password</span>
          <input
            className={style.input}
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button className={style.button} type='submit'>
          Sign in
        </button>
        <span className={style.option}>
          Don't have an account?{' '}
          <Link href={'/signup'} prefetch={false}>
            Sign up
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
