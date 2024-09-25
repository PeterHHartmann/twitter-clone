import style from '@styles/layouts/header/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

type NavLinkProps = {
    href: string;
    icon: string;
    isActive: boolean;
};

export const NavLink: FC<PropsWithChildren<NavLinkProps>> = ({ href, icon, isActive, children }) => {
    return (
        <Link className={isActive ? style.activelink : style.inactivelink} href={href}>
            <Image className={style.icon} src={icon} alt='' width={28} height={28} priority={false} />
            {children}
        </Link>
    );
};
