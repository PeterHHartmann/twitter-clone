import style from '../styles/components/Header.module.scss';
import Image from 'next/image';
import { Session } from "next-auth";

type HeaderProps = {
  name: string;
  href: string;
  icon?: any;
  session: any;
};

export const Header: React.FC<HeaderProps> = ({ name, href, icon, session}) => {
  return (
    <header className={style.container}>
      <a className={style.link} href={href}>
        {/* {name} */}
        {session.user}
      </a>  
      <Image src={icon} alt='' width={19} height={19} priority={true}/>
    </header>
  );
}

export default Header