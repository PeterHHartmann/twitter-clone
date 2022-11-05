import type { ReactNode } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import style from '../styles/layouts/Main.module.scss';

type MainLayoutProps = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: MainLayoutProps) {
  return (
    <div className={style.app}>
      <LeftSidebar />
      {children}
      <RightSidebar />
    </div>
  );
}
