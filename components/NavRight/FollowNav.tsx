import style from '../../styles/components/NavRight/FollowNav.module.scss'
import default_pfp from '../../public/img/default-pfp.jpg'
import Image from "next/image";

const UserLink: React.FC = () => {
  return (
    <a className={style.user} href='/'>
      <Image className={style.img} src={default_pfp} alt='default profile picture' width={48} height={48}></Image>
      <div>
        <p className={style.displayname}>Display Name</p>
        <p className={style.username}>@username</p>
      </div>
      <button className={style.button}>Follow</button>
    </a>
  );
}

export const FollowNav: React.FC = () => {
  return (
    <nav className={style.nav}>
      <h3>Who to follow</h3>
      <UserLink />
      <UserLink />
      <UserLink />
    </nav>
  );
};

export default FollowNav