import type { ReactNode } from 'react';
import NavLeft from '../components/NavLeft/NavLeft';
import NavRight from '../components/NavRight/NavRight';
import style from '../styles/layouts/Main.module.scss';

type MainLayoutProps = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: MainLayoutProps) {
  return (
    <div className={style.app}>
      <NavLeft page='/' />
      {children}
      <NavRight />
    </div>
  );
}
