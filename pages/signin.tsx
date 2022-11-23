import style from '@/styles/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { AuthLayout } from '@/layouts/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, getCsrfToken } from '@/lib/auth';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);
  if (session) return { redirect: { destination: '/', permanent: true } };
  const csrfToken = getCsrfToken(req);
  return { props: { csrfToken: csrfToken } };
};

export const SignIn: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { reload } = useRouter();
  const emailContainerRef = useRef<HTMLLabelElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const emailErrorRef = useRef<HTMLLabelElement>(null);
  const passwordContainerRef = useRef<HTMLLabelElement>(null);

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
    const passwordContainer = passwordContainerRef.current!;
    if (password) {
      passwordContainer.dataset.error = 'false';
    } else {
      passwordContainer.dataset.error = undefined;
    }
    return () => {};
  }, [password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          csrfToken: csrfToken,
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        reload();
      } else {
        const { error } = await response.json();
        emailContainerRef.current!.dataset.error = 'true';
        passwordContainerRef.current!.dataset.error = 'true';
        setError(error as string);
      }
    } catch (err) {
      emailContainerRef.current!.dataset.error = 'true';
      passwordContainerRef.current!.dataset.error = 'true';
      setError('Something went wrong. Please try again later');
    }
  };

  return (
    <AuthLayout>
      <form className={style.form} action='/signin' method='post' autoComplete='off' onSubmit={handleSubmit}>
        <h1 className={style.heading}>Sign in to Twitter</h1>
        {error ? <span className={style.error}>{error}</span> : null}
        <label className={style.label} htmlFor='email' ref={emailContainerRef} data-error={undefined}>
          <span>Email</span>
          <input
            className={style.input}
            id='email'
            name='email'
            type='email'
            value={email}
            onChange={handleEmailChange}
            ref={emailInputRef}
            required
          />
        </label>
        <span className={style.error} ref={emailErrorRef}></span>
        {/* <label className={style.label} htmlFor='password' data-error={password ? (error ? true : false) : null}> */}
        <label className={style.label} htmlFor='password' ref={passwordContainerRef} data-error={undefined}>
          <span className={style.span}>Password</span>
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
          Don&apos;t have an account?&nbsp;
          <Link href={'/signup'} prefetch={false}>
            Sign up
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
