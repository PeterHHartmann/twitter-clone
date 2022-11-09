import style from '../../styles/components/NavLeft/NavLeft.module.scss'
import logo from '../../public/icon/logo.svg'
import home from '../../public/icon/home.svg'
import hashtag from '../../public/icon/hashtag.svg'
import bell from '../../public/icon/bell.svg'
import mail from '../../public/icon/mail.svg'
import bookmark from '../../public/icon/bookmark.svg'
import list from '../../public/icon/list.svg'
import profile from '../../public/icon/profile.svg'
import more from '../../public/icon/more.svg'
import NavLink from "./NavLink";
import UserWidget from "./UserWidget";

type NavLeftProps = {
  page: string;
};

export const NavLeft: React.FC<NavLeftProps> = ({ page }) => {
  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <div className={style.links}>
          <NavLink path='/' icon={logo} />
          <NavLink path='/' icon={home}>
            <p>Home</p>
          </NavLink>
          <NavLink path='/' icon={hashtag}>
            <p>Explore</p>
          </NavLink>
          <NavLink path='/' icon={bell}>
            <p>Notifications</p>
          </NavLink>
          <NavLink path='/' icon={mail}>
            <p>Messages</p>
          </NavLink>
          <NavLink path='/' icon={bookmark}>
            <p>Bookmarks</p>
          </NavLink>
          <NavLink path='/' icon={list}>
            <p>Lists</p>
          </NavLink>
          <NavLink path='/profile' icon={profile}>
            <p>Profile</p>
          </NavLink>
          <NavLink path='/' icon={more}>
            <p>More</p>
          </NavLink>

          {/* make this a component */}
          <button className={style.newTweet}>
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

export default NavLeft