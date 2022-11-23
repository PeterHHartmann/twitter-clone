import style from '@/styles/components/NavLeft/UserWidget.module.scss'
import { useState } from 'react';
import Image from 'next/image';
import default_pfp from '@/public/img/default-pfp.jpg'
import icon from '@/public/icon/more.svg'
import { useRouter } from "next/router";
import { Session } from "@/lib/auth/session";

export const UserWidget: React.FC<{session: Session}> = ({session}) => {
  const [displayLogout, setDisplayLogout] = useState(false);
  const { reload } = useRouter();

  const handleClick = () => {
    setDisplayLogout(!displayLogout);
  };

  const signOut = async () => {
    fetch('/api/auth/signout', {
      method: 'post',
    })
      .then(() => reload())
      .catch();
  };

  return (
    <div className={displayLogout ? style.open : style.closed}>
      {displayLogout && (
        <div className={style.logout}>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
      <div className={style.user} onClick={handleClick}>
        <Image
          className={style.profile}
          src={default_pfp}
          alt='your profile picture'
          width={48}
          height={48}
          priority={true}
        />
        <div className={style.info}>
          <div className={style.displayname}>{session.displayname}</div>
          <div className={style.username}>{session.username}</div>
        </div>
        <Image className={style.more} src={icon} alt='' width={19} height={19} priority={true} />
      </div>
    </div>
  );
}