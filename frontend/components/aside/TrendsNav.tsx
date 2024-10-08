import style from '@styles/layouts/aside/TrendsNav.module.scss';
import icon from '@icon/more.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export const TrendsNav: FC = () => {
    return (
        <nav className={style.nav}>
            <h3>Trends for you</h3>
            <Link className={style.trend} href='/' prefetch={false}>
                <div className={style.text}>
                    <p className='trend-category'>Entertainment ⋅ Trending</p>
                    <p className='trend-heading'>David Lynch</p>
                    <p className='tweet-count'>15.6K Tweets</p>
                </div>
                <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={false} />
            </Link>
            <Link className={style.trend} href='/' prefetch={false}>
                <div className={style.text}>
                    <p className='trend-category'>Politics ⋅ Trending</p>
                    <p className='trend-heading'>New York</p>
                    <p className='tweet-count'>222K Tweets</p>
                </div>
                <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={false} />
            </Link>
            <Link className={style.trend} href='/' prefetch={false}>
                <div className={style.text}>
                    <p className='trend-category'>Music ⋅ Trending</p>
                    <p className='trend-heading'>Kendrick Lamar</p>
                    <p className='tweet-count'>23K Tweets</p>
                </div>
                <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={false} />
            </Link>
            <Link className={style.trend} href='/' prefetch={false}>
                <div className={style.text}>
                    <p className='trend-category'>Gaming ⋅ Trending</p>
                    <p className='trend-heading'>Xbox</p>
                    <p className='tweet-count'>61.8K Tweets</p>
                </div>
                <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={false} />
            </Link>
        </nav>
    );
};
