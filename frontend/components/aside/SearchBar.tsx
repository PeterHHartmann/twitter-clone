import style from '@styles/layouts/aside/SearchBar.module.scss';
import icon from '@icon/search.svg';
import Image from 'next/image';
import { FC } from 'react';

export const SearchBar: FC = () => {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <Image className={style.icon} src={icon} alt='' width={19} height={19} priority={false} />
                <input className={style.input} type='text' placeholder='Search Twitter'></input>
            </form>
        </div>
    );
};
