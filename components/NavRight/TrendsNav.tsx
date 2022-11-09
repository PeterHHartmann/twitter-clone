import style from '../../styles/components/NavRight/TrendsNav.module.scss'
import icon from '../../public/icon/more.svg'
import Image from 'next/image';

export const TrendsNav: React.FC = () => {
  return (
    <nav className={style.nav}>
      <h3>Trends for you</h3>
      <a className={style.trend} href="/">
        <div className={style.text}>
          <p className='trend-category'>Entertainment ⋅ Trending</p>
          <p className='trend-heading'>David Lynch</p>
          <p className='tweet-count'>15.6K Tweets</p>
        </div>
        <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={true}/>
      </a>
      <a className={style.trend} href="/">
        <div className={style.text}>
          <p className='trend-category'>Politics ⋅ Trending</p>
          <p className='trend-heading'>New York</p>
          <p className='tweet-count'>222K Tweets</p>
        </div>
        <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={true}/>
      </a>
      <a className={style.trend} href="/">
        <div className={style.text}>
          <p className='trend-category'>Music ⋅ Trending</p>
          <p className='trend-heading'>Kendrick Lamar</p>
          <p className='tweet-count'>23K Tweets</p>
        </div>
        <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={true}/>
      </a>
      <a className={style.trend} href="/">
        <div className={style.text}>
          <p className='trend-category'>Gaming ⋅ Trending</p>
          <p className='trend-heading'>Xbox</p>
          <p className='tweet-count'>61.8K Tweets</p>
        </div>
        <Image className={style.icon} src={icon} alt='' width={21} height={21} priority={true}/>
      </a>
    </nav>
  );
}

export default TrendsNav