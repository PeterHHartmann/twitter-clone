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
        <div className={style.profile}>
          <Image src={default_pfp} alt='your profile picture' width={48} height={48}/>
        </div>
        <div className={style.info}>
          <div>Display Name</div>
          <div>@Username</div>
        </div>
        <svg viewBox='0 0 24 24'>
          <use href='/icons.svg#more'></use>
        </svg>
        <Image src={icon} alt='' width={19} height={19} priority={true}/>
      </div>
    </div>
  );
}

export default UserWidget