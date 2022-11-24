import style from '@styles/AuthForm.module.scss';
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next';
import { FC, FormEvent, useEffect, useState } from 'react';
import { AuthLayout } from '@layouts/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, getCsrfToken } from '@lib/auth';
import { FormInput } from "@components/Auth/FormInput";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);
  if (session) return { redirect: { destination: '/', permanent: true } };
  const csrfToken = getCsrfToken(req);
  return { props: { csrfToken: csrfToken } };
};

export const SignIn: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [serverInputError, setServerInputError] = useState<string | boolean | null>(null);
  const { reload } = useRouter();

  useEffect(() => {
    return () => setServerInputError(null);
  }, [email, password]);

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
        setServerInputError(true);
        setServerError(error as string);
      }
    } catch (err) {
      setServerError('Something went wrong. Please try again later');
    }
  };

  return (
    <AuthLayout>
      <form className={style.form} action='/signin' method='post' autoComplete='off' onSubmit={handleSubmit}>
        <h1 className={style.heading}>Sign in to Twitter</h1>
        {serverError ? <span className={style.error}>{serverError}</span> : null}
        <FormInput type='email' value={email} setValue={setEmail} serverError={serverInputError} checkValid={true}/>
        <FormInput type='password' value={password} setValue={setPassword} serverError={serverInputError} />
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
