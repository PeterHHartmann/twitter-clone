import style from '../styles/AuthForm.module.scss';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Link from 'next/link';

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const refEmail = useRef<HTMLInputElement>(null);
  const refUsername = useRef<HTMLInputElement>(null);
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
        const { error } = await response.json();
        setEmailError(null);
        setUsernameError(null);
        if (error.target === 'email') {
          setEmailError(error.msg)
        }
        if (error.target === 'username') {
          setUsernameError(error.msg)
        }
      } else {
        const body = await response.json();
        console.log(body);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (emailError) {
      setEmailError(null);
    }

    const timeout = setTimeout(() => {
      if (email && !refEmail.current?.checkValidity()) {
        console.count('setting error');
        setEmailError('Please enter a valid email')
      }
    }, 500);
    return () => {clearTimeout(timeout)}
  }, [email])

  useEffect(() => {
    if (usernameError) {
      setUsernameError(null);
    }

    const timeout = setTimeout(() => {
      if (username && !refUsername.current?.checkValidity()) {
        setUsernameError('Please enter a valid email')
      }
    }, 500);
    return () => {clearTimeout(timeout)}
  }, [email])

  return (
    <AuthLayout>
      <form className={style.form} action='' method='post' onSubmit={handleSubmit}>
        <h1 className={style.heading}>Join Twitter today</h1>
        <label className={style.label} htmlFor='email' data-error={email ? (emailError ? true : false) : null}>
          <span>Email</span>
          <input
            className={style.input}
            ref={refEmail}
            type='text'
            name='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <span className={style.error}>{emailError ? emailError : null}</span>
        <label
          className={style.label}
          htmlFor='username'
          data-error={username ? (usernameError ? true : false) : null}
        >
          <span>Username</span>
          <input
            className={style.input}
            ref={refUsername}
            type='text'
            name='username'
            value={username}
            onChange={handleUsernameChange}
            maxLength={50}
            required
          />
        </label>
        <span className={style.error}>{usernameError ? usernameError : null}</span>
        <label
          className={style.label}
          htmlFor='password'
        >
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

export default SignUp;
