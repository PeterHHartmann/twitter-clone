import style from '../styles/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession, signIn } from 'next-auth/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null)
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setEmail(value);
  };

  useEffect(() => {
    if (emailError) {
      setEmailError(null);
    }
    const timeout = setTimeout(() => { 
      if (email && !inputRef.current?.checkValidity()) {
        setEmailError('Please enter a valid email');
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [email]);

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });
    if (response) {
      if (response.status === 200) {
        router.push('/');
      } else {
        setError(response.error as string);
      }
    } else {
      setError('Something went wrong. Please try again later');
    }
  };

  return (
    <AuthLayout>
      <h1 className={style.heading}>Sign in to Twitter</h1>
      {error ? <span className={style.error}>{error}</span> : null}
      <form className={style.form} action='/signin' method='post' autoComplete='off' onSubmit={handleSubmit}>
        <input type='hidden' name='csrfToken' defaultValue={csrfToken} autoComplete='off' />
        <label className={style.label} htmlFor='email' data-error={email ? (error || emailError ? true : false) : null}>
          <span className={style.span}>Email</span>
          <input
            className={style.input}
            id='email'
            name='email'
            type='email'
            value={email}
            onChange={handleEmailChange}
            ref={inputRef}
            required
          />
        </label>
        <span className={style.error}>{emailError ? emailError : null}</span>
        <label
          className={style.label}
          htmlFor='password'
          data-error={password ? (error ? true : false) : null}
        >
          <span className={style.span} data-error={error ? true : false}>
            Password
          </span>
          <input
            className={style.input}
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            id='current-password'
            autoComplete='current-password'
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
