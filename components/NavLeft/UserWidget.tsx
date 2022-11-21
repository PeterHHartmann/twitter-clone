import style from '@/styles/components/NavLeft/UserWidget.module.scss'
import { useState } from 'react';
import Image from 'next/image';
import default_pfp from '@/public/img/default-pfp.jpg'
import icon from '@/public/icon/more.svg'
import { useRouter } from "next/router";

export const UserWidget: React.FC<{session: any}> = ({session}) => {
  const [displayLogout, setDisplayLogout] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setDisplayLogout(!displayLogout);
  }

  const signOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'post',
      });
      if (response.ok) {
        router.push('/signin')
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={displayLogout ? style.open : style.closed}>
      {displayLogout && (
        <div className={style.logout}>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
      <div className={style.user} onClick={handleClick}>
        <Image className={style.profile} src={default_pfp} alt='your profile picture' width={48} height={48} />
        <div className={style.info}>
          <div className={style.displayname}>{session?.displayname}</div>
          <div className={style.username}>{session?.username}</div>
        </div>
        <Image className={style.more} src={icon} alt='' width={19} height={19} priority={true} />
      </div>
    </div>
  );
}

export default UserWidget