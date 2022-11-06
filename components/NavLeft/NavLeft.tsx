import style from '../../styles/components/NavLeft/NavLeft.module.scss'
import NavLink from "./NavLink";
import UserWidget from "./UserWidget";

type Props = {
  page: string;
};

export default function NavLeft({ page }: Props) {
  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <div className='nav-links'>
          <NavLink path='/' icon='logo' />
          <NavLink path='/' icon='home'>
            <p>Home</p>
          </NavLink>
          <NavLink path='/' icon='hashtag'>
            <p>Explore</p>
          </NavLink>
          <NavLink path='/' icon='bell'>
            <p>Notifications</p>
          </NavLink>
          <NavLink path='/' icon='mail'>
            <p>Messages</p>
          </NavLink>
          <NavLink path='/' icon='bookmark'>
            <p>Bookmarks</p>
          </NavLink>
          <NavLink path='/' icon='list'>
            <p>Lists</p>
          </NavLink>
          <NavLink path='/profile' icon='profile'>
            <p>Profile</p>
          </NavLink>
          <NavLink path='/' icon='more'>
            <p>More</p>
          </NavLink>

          {/* make this a component */}
          <button id='new-tweet-open' className={style.newTweet}>
            <span>Tweet</span>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#newTweet'></use>
            </svg>
          </button>
        </div>
        <UserWidget/>
      </nav>
    </div>
  );
}
