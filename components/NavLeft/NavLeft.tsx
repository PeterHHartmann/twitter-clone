import style from '@/styles/components/NavLeft/NavLeft.module.scss';
import logo from '@/public/icon/logo.svg';
import home from '@/public/icon/home.svg';
import hashtag from '@/public/icon/hashtag.svg';
import bell from '@/public/icon/bell.svg';
import mail from '@/public/icon/mail.svg';
import bookmark from '@/public/icon/bookmark.svg';
import list from '@/public/icon/list.svg';
import profile_icon from '@/public/icon/profile.svg';
import more from '@/public/icon/more-circle.svg';
import iconPen from '@/public/icon/pen.svg';
import { NavLink } from '@/components/NavLeft/NavLink';
import { UserWidget } from '@/components/NavLeft/UserWidget';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from '@/lib/auth/session';
import { useRouter } from 'next/router';
import { FC } from "react";

export const NavLeft: FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const { profile } = router.query;
  const pathname = profile ? profile : router.pathname;

  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <div className={style.links}>
          <Link className={style.logo} href='/' prefetch={false}>
            <Image src={logo} alt='' width={28} height={28} priority={true} />
          </Link>
          <NavLink href='/' icon={home} isActive={pathname === '/' ? true : false}>
            <p>Home</p>
          </NavLink>
          <NavLink href='/' icon={hashtag} isActive={pathname === '/explore' ? true : false}>
            <p>Explore</p>
          </NavLink>
          <NavLink href='/' icon={bell} isActive={pathname === '/notifications' ? true : false}>
            <p>Notifications</p>
          </NavLink>
          <NavLink href='/' icon={mail} isActive={pathname === '/messages' ? true : false}>
            <p>Messages</p>
          </NavLink>
          <NavLink href='/' icon={bookmark} isActive={pathname === '/bookmarks' ? true : false}>
            <p>Bookmarks</p>
          </NavLink>
          <NavLink href='/' icon={list} isActive={pathname === '/lists' ? true : false}>
            <p>Lists</p>
          </NavLink>
          <NavLink
            href={`/${session.username}`}
            icon={profile_icon}
            isActive={pathname === session.username ? true : false}
          >
            <p>Profile</p>
          </NavLink>
          <NavLink href='/' icon={more} isActive={pathname === '/more' ? true : false}>
            <p>More</p>
          </NavLink>
          <button className={style.newTweet}>
            <span>Tweet</span>
            <Image src={iconPen} alt='' width={22.5} height={22.5} priority={true} />
          </button>
        </div>
        <UserWidget session={session}></UserWidget>
      </nav>
    </div>
  );
};
