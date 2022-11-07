import style from '../../styles/components/NavLeft/UserWidget.module.scss'

import { useState } from 'react';
import Image from 'next/image';

export default function UserWidget() {
  const [displayLogout, setDisplayLogout] = useState(false);

  function handleClick() {
    setDisplayLogout(!displayLogout);
  }

  return (
    <div className={style.container}>
      {displayLogout && (
        <div className={style.logout}>
          <a href='/logout'>
            Logout
          </a>
        </div>
      )}
      <div className={style.user} onClick={handleClick}>
        <Image src='/img/default-pfp.jpg' alt='profile picture'/>
        <div className={style.info}>
          <div>Display Name</div>
          <div>@Username</div>
        </div>
        <svg viewBox='0 0 24 24'>
          <use href='/icons.svg#more'></use>
        </svg>
      </div>
    </div>
  );
}
