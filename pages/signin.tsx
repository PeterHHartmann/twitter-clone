import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import AuthLayout from "../layouts/AuthLayout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: '/',
      },
      props: {}
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <AuthLayout>
      <h1>Sign in to Twitter</h1>
      {error && <span>error: {error}</span>}
      <form action='/api/auth/callback/credentials' method='post' autoComplete='off'>
        <input type='hidden' name='csrfToken' defaultValue={csrfToken} autoComplete="off"/>
        <input type='hidden' value='something' />
        <label htmlFor='email'>
          <span>Username</span>
          <input 
            name='email' 
            type='text' 
            value={ username } 
            onChange={handleUsernameChange} 
            autoComplete="off"
            required 
            />
        </label>
        <label htmlFor='password'>
          <span>Password</span>
          <input 
            type='password' 
            name='password' 
            value={ password } 
            onChange={handlePasswordChange} 
            autoComplete="off"
            required />
        </label>
        <button type='submit'>Sign in</button>
      </form>
    </AuthLayout>
  );
};



export default SignIn;