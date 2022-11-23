import style from '@/styles/components/Header.module.scss';
import Image from 'next/image';
import { FC } from "react";

type HeaderProps = {
  name: string;
  href: string;
  icon?: any;
};

export const Header: FC<HeaderProps> = ({ name, href, icon }) => {
  return (
    <header className={style.container}>
      <a className={style.link} href={href}>
        {name}
      </a>
      {icon ? <Image src={icon} alt='' width={19} height={19} priority={true}/> : null}
    </header>
  );
};