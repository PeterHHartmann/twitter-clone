import style from '@styles/components/NavLeft/UserWidget.module.scss'

import { useState } from 'react';
import Image from 'next/image';
import default_pfp from '@public/img/default-pfp.jpg'
import icon from '@public/icon/more.svg'
import { deleteSession } from '../../services/session-service';
import { useRouter } from "next/router";

export const UserWidget: React.FC<{user: any}> = ({user}) => {
  const [displayLogout, setDisplayLogout] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setDisplayLogout(!displayLogout);
  }

  const signOut = () => {
    deleteSession();
    router.push('/signin')
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
          <div className={style.displayname}>{user?.displayname}</div>
          <div className={style.username}>{user?.username}</div>
        </div>
        <Image className={style.more} src={icon} alt='' width={19} height={19} priority={true} />
      </div>
    </div>
  );
}

export default UserWidget