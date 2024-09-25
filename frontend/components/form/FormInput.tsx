import style from '@styles/components/FormInput.module.scss';
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';

type Props = {
    name: string;
    type: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    serverError: string | boolean | null;
    checkValid?: boolean;
    required?: boolean | undefined;
};

export const FormInput: FC<Props> = ({ name, type, value, setValue, serverError, checkValid, required }) => {
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

    const label = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <>
            <label className={style.label} htmlFor={name} data-error={serverError ? true : value ? errorVisible : ''}>
                <span>{label}</span>
                <input
                    className={style.input}
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    required={required}
                />
            </label>
            <span className={style.error}>{errorVisible ? `Please enter a valid ${name}` : serverError}</span>
        </>
    );
};
