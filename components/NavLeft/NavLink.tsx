import style from '@/styles/components/NavLeft/NavLink.module.scss';
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

type NavLinkProps = {
  href: string;
  icon: string;
  isActive: boolean;
}

export const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({ href , icon, isActive, children }) => {
  return (
    <Link className={isActive ? style.activelink : style.inactivelink} href={href} prefetch={false}>
      <Image className={style.icon} src={icon} alt='' width={28} height={28} priority={true}/>
      {children}
    </Link>
  );
};
