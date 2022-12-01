import style from '@styles/components/DeckHeader.module.scss';
import Image from 'next/image';
import Link from "next/link";
import { FC } from 'react';
import backIcon from '@icon/back.svg'

type Props = {
  title: string;
  subtitle?: string;
  href: string;
  icon?: any;
  referer?: string;
};

export const DeckHeader: FC<Props> = ({ title, subtitle, href, icon, referer }) => {
  return (
    <header className={style.container}>
      <div className={style.left}>
        {referer ? (
          <Link href={href} className={style.back}>
            <Image src={backIcon} alt='Back' width={20} height={20} priority={true}></Image>
          </Link>
        ) : null}
        <div className={style.title}>
          <a href={href}>{title}</a>
          {subtitle ? <span>{subtitle}</span> : null}
        </div>
      </div>
      {icon ? <Image src={icon} alt='' width={19} height={19} priority={true} /> : null}
    </header>
  );
};