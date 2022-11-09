import style from '../../styles/components/NavLeft/UserWidget.module.scss'

import { useState } from 'react';
import Image from 'next/image';
import default_pfp from '../../public/img/default-pfp.jpg'
import icon from '../../public/icon/more.svg'

export const UserWidget: React.FC = () => {
  const [displayLogout, setDisplayLogout] = useState(false);

  function handleClick() {
    setDisplayLogout(!displayLogout);
  }

  return (
    <div className={style.container}>
      {displayLogout && (
        <div className={style.logout}>
          <a href='/logout'>Logout</a>
        </div>
      )}
      <div className={style.user} onClick={handleClick}>
        <Image className={style.profile} src={default_pfp} alt='your profile picture' width={48} height={48}/>
        <div className={style.info}>
          <div className={style.displayname}>Display Name</div>
          <div className={style.username}>@Username</div>
        </div>
        <Image className={style.more} src={icon} alt='' width={19} height={19} priority={true}/>
      </div>
    </div>
  );
}

export default UserWidget