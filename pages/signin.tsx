import style from '../styles/AuthForm.module.scss';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession, signIn } from 'next-auth/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

enum ErrorType {
  ANY = 'any',
  EMAIL = 'email',
  PASSWORD = 'password',
}

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
  const [validEmail, setValidEmail] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const emailSpan = useRef<HTMLSpanElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  const handleEmailChange = async (e: FormEvent<HTMLInputElement>) => {
    emailSpan.current!.className = style.spanAfterInput
    const target = e.target as HTMLInputElement;
    const { value } = target;
    if (value){
      console.log('no value');
      
      setValidEmail(target.checkValidity());
    } else {
      console.log('value');
      setValidEmail(true)
    }
    console.log(value);
    setEmail(value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
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
      setError('Something went wrong\n Please try again later');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const current = emailSpan.current!
      if (email) {
        if (error) {
          current.className = style.spanAfterInputError;
        } else {
          current.className = validEmail ? style.spanAfterInput : style.spanAfterInputError;
        }
      } else {
        console.log('input is empty');
        current.className = style.spanNoInput;
      }
    }, 500)
  }, [validEmail])

  return (
    <AuthLayout>
      <h1 className={style.heading}>Sign in to Twitter</h1>
      {error ? <span className={style.error}>{error}</span> : null}
      <form className={style.form} action='/signin' method='post' autoComplete='off' onSubmit={handleSubmit}>
        <input type='hidden' name='csrfToken' defaultValue={csrfToken} autoComplete='off' />
        <label className={style.label} htmlFor='email'>
          <span
            className={email ? (error ? style.spanAfterInputError : style.spanAfterInput) : style.spanNoInput}
            ref={emailSpan}
          >
            Email
          </span>
          <input
            className={style.input}
            name='email'
            type='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label className={style.label} htmlFor='password'>
          <span className={password ? (error ? style.spanAfterInputError : style.spanAfterInput) : style.spanNoInput}>
            Password
          </span>
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
