import style from '@styles/components/NavRight/FollowNav.module.scss'
import default_pfp from '@image/default-pfp.jpg'
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const UserLink: FC = () => {
  return (
    <Link className={style.user} href='/' prefetch={false}>
      <Image className={style.img} src={default_pfp} alt='default profile picture' width={48} height={48}></Image>
      <div>
        <p className={style.displayname}>Display Name</p>
        <p className={style.username}>@username</p>
      </div>
      <button className={style.button}>Follow</button>
    </Link>
  );
}

export const FollowNav: FC = () => {
  return (
    <nav className={style.nav}>
      <h3>Who to follow</h3>
      <UserLink />
      <UserLink />
      <UserLink />
      <UserLink />
    </nav>
  );
};