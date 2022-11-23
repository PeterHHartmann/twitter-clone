import style from '@/styles/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { AuthLayout } from '@/layouts/AuthLayout';
import Link from 'next/link';
import { getSession, getCsrfToken } from '@/lib/auth';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);
  if (session) return { redirect: { destination: '/', permanent: true } };
  const csrfToken = getCsrfToken(req);
  return { props: { csrfToken: csrfToken } };
};

export const SignUp: FC<InferGetServerSidePropsType<any>> = ({csrfToken}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const emailContainerRef = useRef<HTMLLabelElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const emailErrorRef = useRef<HTMLLabelElement>(null);
  const usernameContainerRef = useRef<HTMLLabelElement>(null);
  const usernameErrorRef = useRef<HTMLLabelElement>(null);
  const passwordContainerRef = useRef<HTMLLabelElement>(null);
  const passwordErrorRef = useRef<HTMLLabelElement>(null);
  const router = useRouter();

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setEmail(value);
  };

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setUsername(value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setPassword(value);
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailErrorRef.current!.innerText = '';
    usernameErrorRef.current!.innerText = '';
    passwordErrorRef.current!.innerText = '';
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
          emailContainerRef.current!.dataset.error = 'true';
          emailErrorRef.current!.innerText = error.msg;
        } else if (error.target === 'username') {
          usernameContainerRef.current!.dataset.error = 'true';
          usernameErrorRef.current!.innerText = error.msg;
        } else if (error.target === 'password') {
          passwordContainerRef.current!.dataset.error = 'true';
          passwordErrorRef.current!.innerText = error.msg;
        } else {
          setError('Something went wrong. Please try again later');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again later');
    }
  };

  useEffect(() => {
    const emailContainer = emailContainerRef.current!;
    const emailError = emailErrorRef.current!;
    if (email) {
      emailContainer.dataset.error = 'false';
    } else {
      emailContainer.dataset.error = undefined;
    }
    emailError.innerText = '';
    const timeout = setTimeout(() => {
      if (email && !emailInputRef.current!.checkValidity()) {
        emailContainer.dataset.error = 'true';
        emailError.innerText = 'Please enter a valid email';
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [email]);

  useEffect(() => {
    const usernameContainer = usernameContainerRef.current!;
    if (username) {
      usernameContainer.dataset.error = 'false';
    } else {
      usernameContainer.dataset.error = undefined;
    }
    return () => {};
  }, [username]);

  useEffect(() => {
    const passwordContainer = passwordContainerRef.current!;
    if (password) {
      passwordContainer.dataset.error = 'false';
    } else {
      passwordContainer.dataset.error = undefined;
    }
    return () => {};
  }, [password]);

  return (
    <AuthLayout>
      <form className={style.form} action='' method='post' onSubmit={handleSubmit}>
        <h1 className={style.heading}>Join Twitter today</h1>
        {error ? <span className={style.error}>{error}</span> : null}
        <label className={style.label} htmlFor='email' ref={emailContainerRef} data-error={undefined}>
          <span>Email</span>
          <input
            className={style.input}
            ref={emailInputRef}
            type='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <span className={style.error} ref={emailErrorRef}></span>
        <label className={style.label} htmlFor='username' ref={usernameContainerRef} data-error={undefined}>
          <span>Username</span>
          <input
            className={style.input}
            type='text'
            name='username'
            value={username}
            onChange={handleUsernameChange}
            maxLength={50}
            required
          />
        </label>
        <span className={style.error} ref={usernameErrorRef}></span>
        <label className={style.label} ref={passwordContainerRef} htmlFor='password'>
          <span>Password</span>
          <input
            className={style.input}
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <span className={style.error} ref={passwordErrorRef}></span>
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
