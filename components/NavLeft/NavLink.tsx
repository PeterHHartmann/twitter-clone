import { ReactNode } from "react";
import style from '../../styles/components/NavLeft/NavLink.module.scss';

type Props = {
  path: string;
  icon: string;
  children?: ReactNode | ReactNode[];
};

export default function NavLink({ path, icon, children }: Props) {
  return (
    <a className={style.link} href={path}>
      <svg className={style.icon} viewBox='0 0 24 24'>
        <use href={'/icons.svg#' + icon}></use>
      </svg>
      {children}
    </a>
  );
}
