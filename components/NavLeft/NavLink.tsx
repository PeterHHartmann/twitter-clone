import Image from "next/image";
import { PropsWithChildren } from "react";
import style from '../../styles/components/NavLeft/NavLink.module.scss';

type NavLinkProps = {
  path: string;
  icon: any;
  isActive?: boolean;
};

export const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({ path, icon, isActive, children }) => {
  return (
    <a 
      className={isActive ? style.activelink : style.inactivelink} 
      href={path}
    >
      <Image className={style.icon} src={icon} alt='' width={28} height={28} priority={true}/>
      {children}
    </a>
  );
}

export default NavLink
