import style from '../../styles/components/NavLeft/NavLeft.module.scss'
import logo from '../../public/icon/logo.svg'
import home from '../../public/icon/home.svg'
import hashtag from '../../public/icon/hashtag.svg'
import bell from '../../public/icon/bell.svg'
import mail from '../../public/icon/mail.svg'
import bookmark from '../../public/icon/bookmark.svg'
import list from '../../public/icon/list.svg'
import profile from '../../public/icon/profile.svg'
import more from '../../public/icon/more-circle.svg'
import iconPen from '../../public/icon/pen.svg'
import NavLink from "./NavLink";
import UserWidget from "./UserWidget";
import Image from 'next/image'
import { DefaultSession, Session } from "next-auth"

type NavLeftProps = {
  path: string;
  user: any;
};

export const NavLeft: React.FC<NavLeftProps> = ({ path, user }) => {
  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <div className={style.links}>
          <a className={style.logo}>
            <Image src={logo} alt='' width={28} height={28} priority={true}/>
          </a>
          <NavLink path='/' icon={home} isActive={path === '/' ? true : false}>
            <p>Home</p>
          </NavLink>
          <NavLink path='/' icon={hashtag} isActive={path === '/explore' ? true : false}>
            <p>Explore</p>
          </NavLink>
          <NavLink path='/' icon={bell} isActive={path === '/notifications' ? true : false}>
            <p>Notifications</p>
          </NavLink>
          <NavLink path='/' icon={mail} isActive={path === '/messages' ? true : false}>
            <p>Messages</p>
          </NavLink>
          <NavLink path='/' icon={bookmark} isActive={path === '/bookmarks' ? true : false}>
            <p>Bookmarks</p>
          </NavLink>
          <NavLink path='/' icon={list} isActive={path === '/lists' ? true : false}>
            <p>Lists</p>
          </NavLink>
          <NavLink path='/profile' icon={profile} isActive={path === '/profile' ? true : false}>
            <p>Profile</p>
          </NavLink>
          <NavLink path='/' icon={more} isActive={path === '/more' ? true : false}>
            <p>More</p>
          </NavLink>
          <button className={style.newTweet}>
            <span>Tweet</span>
            <Image src={iconPen} alt='' width={22.5} height={22.5}/>
          </button>
        </div>
        <UserWidget user={user}></UserWidget>
      </nav>
    </div>
  );
}

export default NavLeft