import style from '../styles/layouts/AuthLayout.module.scss'
import { GetServerSideProps } from 'next';
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from 'react';
import AuthLayout from "../layouts/AuthLayout";


export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEmail(value);
  };

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUsername(value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
      if (response.status === 201) {
        router.push('/signin')
      } else if (response.status === 409) {
        const error = await response.json();
        setError(error.msg)
      }
    } catch(e) { console.log(e) }
  };

  return (
    <AuthLayout>
      {/* TODO add minmax to inputs */}
      <form action='' method='post' onSubmit={handleSubmit}>
        <h1>Join Twitter today</h1>
        {error && <span>error: {error}</span>}
        <label htmlFor='email'>
          <span>Email</span>
          <input type='email' name='email' value={email} onChange={handleEmailChange} required />
        </label>
        <label htmlFor='username'>
          <span>Username</span>
          <input type='text' name='username' value={username} onChange={handleUsernameChange} required />
        </label>
        <label htmlFor='password'>
          <span>Password</span>
          <input type='password' name='password' value={password} onChange={handlePasswordChange} required />
        </label>
        <button type='submit'>Sign Up</button>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default SignUp;
