import { PropsWithChildren, ReactNode } from "react";
import style from '../../styles/components/NavLeft/NavLink.module.scss';

type NavLinkProps = {
  path: string;
  icon: string;
};

export const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({ path, icon, children }) => {
  return (
    <a className={style.link} href={path}>
      <svg className={style.icon} viewBox='0 0 24 24'>
        <use href={'/icons.svg#' + icon}></use>
      </svg>
      {children}
    </a>
  );
}

export default NavLink
