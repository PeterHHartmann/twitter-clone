import style from '../../styles/components/NavRight/TrendsNav.module.scss'
import { PropsWithChildren } from 'react';

const Trend: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <a className={style.trend} href="/">
      <div className={style.text}>{children}</div>
      <svg className={style.icon} viewBox='0 0 24 24'>
        <use href='/icons.svg#more'></use>
      </svg>
    </a>
  );
};

export const TrendsNav: React.FC = () => {
  return (
    <nav className={style.nav}>
      <h3>Trends for you</h3>
      <Trend>
        <p className='trend-category'>Entertainment ⋅ Trending</p>
        <p className='trend-heading'>David Lynch</p>
        <p className='tweet-count'>15.6K Tweets</p>
      </Trend>
      <Trend>
        <p className='trend-category'>Politics ⋅ Trending</p>
        <p className='trend-heading'>New York</p>
        <p className='tweet-count'>222K Tweets</p>
      </Trend>
      <Trend>
        <p className='trend-category'>Music ⋅ Trending</p>
        <p className='trend-heading'>Kendrick Lamar</p>
        <p className='tweet-count'>23K Tweets</p>
      </Trend>
      <Trend>
        <p className='trend-category'>Gaming ⋅ Trending</p>
        <p className='trend-heading'>Xbox</p>
        <p className='tweet-count'>61.8K Tweets</p>
      </Trend>
    </nav>
  );
}

export default TrendsNav