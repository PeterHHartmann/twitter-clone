import style from '@/styles/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FormEvent, useEffect, useRef, useState } from 'react';
import AuthLayout from '@/layouts/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, setSession } from '@/services/session-service';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  if (session) return { redirect: { destination: '/', permanent: true }};
  return { props: {}};
};

export const SignIn: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({csrfToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setEmail(value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response) {
        if (response.status === 200) {
          const { session, expires } = await response.json();
          setSession(session, expires)
          router.push('/');
        } else if (response.status === 422) {
          const { error } = await response.json();
          setError(error as string);
        }
      }
    } catch (e) {
      console.log(e);
      setError('Something went wrong. Please try again later');
    }
  };

  return (
    <AuthLayout>
      <form className={style.form} action='/signin' method='post' autoComplete='off' onSubmit={handleSubmit}>
        <h1 className={style.heading}>Sign in to Twitter</h1>
        {error ? <span className={style.error}>{error}</span> : null}
        {/* <input type='hidden' name='csrfToken' defaultValue={csrfToken} autoComplete='off' /> */}
        <label className={style.label} htmlFor='email' data-error={email ? (error || emailError ? true : false) : null}>
          <span>Email</span>
          <input
            className={style.input}
            id='email'
            name='email'
            type='text'
            value={email}
            onChange={handleEmailChange}
            ref={inputRef}
            required
          />
        </label>
        <span className={style.error}>{emailError ? emailError : null}</span>
        <label className={style.label} htmlFor='password' data-error={password ? (error ? true : false) : null}>
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
