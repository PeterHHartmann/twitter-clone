import style from '@styles/layouts/header/Header.module.scss';
import logo from '@icon/logo.svg';
import home from '@icon/home.svg';
import hashtag from '@icon/hashtag.svg';
import bell from '@icon/bell.svg';
import mail from '@icon/mail.svg';
import bookmark from '@icon/bookmark.svg';
import list from '@icon/list.svg';
import profile_icon from '@icon/profile.svg';
import more from '@icon/more-circle.svg';
import iconPen from '@icon/pen.svg';
import { NavLink } from '@components/header/NavLink';
import { UserWidget } from '@components/header/UserWidget';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from '@lib/auth/session';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { TweetWidget } from '@components/TweetWidget';

type Props = {
    session: Session;
    csrfToken: string;
};

export const Header: FC<Props> = ({ session, csrfToken }) => {
    const router = useRouter();
    const { profile } = router.query;
    const pathname = profile ? profile : router.pathname;
    const [isTweetOpen, setIsTweetOpen] = useState(false);

    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <div className={style.links}>
                    <Link className={style.logo} href='/' prefetch={false}>
                        <Image src={logo} alt='' width={28} height={28} priority={false} />
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
                    <a
                        href={`/${session.username}`}
                        className={pathname === session.username ? style.activelink : style.inactivelink}
                    >
                        <Image className={style.icon} src={profile_icon} alt='' width={28} height={28} priority={false} />
                        <p>Profile</p>
                    </a>
                    <NavLink href='/' icon={more} isActive={pathname === '/more' ? true : false}>
                        <p>More</p>
                    </NavLink>
                    <button className={style.newTweet} onClick={() => setIsTweetOpen(true)}>
                        <span>Tweet</span>
                        <Image src={iconPen} alt='' width={22.5} height={22.5} priority={false} />
                    </button>
                    {isTweetOpen ? (
                        <div className={style.modal}>
                            <div className={style.wrapper}>
                                <h2>New Tweet</h2>
                                <TweetWidget session={session} csrfToken={csrfToken} />
                            </div>
                        </div>
                    ) : null}
                </div>
                <UserWidget session={session} />
            </nav>
        </header>
    );
};
