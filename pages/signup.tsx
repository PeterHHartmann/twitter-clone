import style from '../styles/AuthForm.module.scss';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Link from 'next/link';

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
        router.push('/signin');
      } else if (response.status === 409) {
        const body = await response.json();
        setError(body.field);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthLayout>
      {/* TODO add minmax to inputs */}
      <form className={style.form} action='' method='post' onSubmit={handleSubmit}>
        <h1 className={style.heading}>Join Twitter today</h1>
        <label className={style.label} htmlFor='email'>
          <span
            className={
              email ? (error === 'email' ? style.spanAfterInputError : style.spanAfterInput) : style.spanNoInput
            }
          >
            Email
          </span>
          <input
            className={style.input}
            type='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <span className={style.error}>{error === 'email' ? 'Email is already taken' : ''}</span>
        <label className={style.label} htmlFor='username'>
          <span
            className={
              username ? (error === 'username' ? style.spanAfterInputError : style.spanAfterInput) : style.spanNoInput
            }
          >
            Username
          </span>
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
        <span className={style.error}>{error === 'username' ? 'Username is already taken' : ''}</span>
        <label className={style.label} htmlFor='password'>
          <span
            className={
              password ? (error === 'password' ? style.spanAfterInputError : style.spanAfterInput) : style.spanNoInput
            }
          >
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
        <span className={style.error}>{}</span>
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

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default SignUp;
