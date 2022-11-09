import Image from "next/image";
import { PropsWithChildren } from "react";
import style from '../../styles/components/NavLeft/NavLink.module.scss';

type NavLinkProps = {
  path: string;
  icon: any;
};

export const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({ path, icon, children }) => {
  return (
    <a className={style.link} href={path}>
      {/* <svg className={style.icon} viewBox='0 0 24 24'>
        <use href={'/icons.svg#' + icon}></use>
      </svg> */}
      <Image className={style.icon} src={icon} alt='' width={28} height={28} priority={true}/>
      {children}
    </a>
  );
}

export default NavLink
