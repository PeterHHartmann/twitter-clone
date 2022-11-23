import style from '@/styles/AuthForm.module.scss';
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';

type Props = {
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  serverError: string | boolean | null;
  checkValid?: boolean;
};

export const FormInput: FC<Props> = ({ type, value, setValue, serverError, checkValid }) => {
  const [errorVisible, setErrorVisible] = useState<boolean | null>(false);
  const timeoutRef = useRef<any | null>(null);

  const handleValueChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setValue(value);

    if (checkValid) {
      clearTimeout(timeoutRef.current!);
      if (value) {
        timeoutRef.current = setTimeout(() => {
          if (!target.checkValidity()) {
            setErrorVisible(true);
          } else {
            setErrorVisible(false);
          }
        }, 500);
      } else {
        setErrorVisible(null);
      }
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current!);
  }, []);

  const label = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <>
      <label className={style.label} htmlFor={type} data-error={serverError ? true : (value ? errorVisible : '')}>
        <span>{label}</span>
        <input
          className={style.input}
          id={type}
          name={type}
          type={type}
          value={value}
          onChange={handleValueChange}
          required
        />
      </label>
      <span className={style.error}>{errorVisible ? `Please enter a valid ${type}` : serverError}</span>
    </>
  );
};
