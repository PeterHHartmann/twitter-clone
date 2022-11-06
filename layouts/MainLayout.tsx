import type { ReactNode } from 'react';
import LeftSidebar from '../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import style from '../styles/layouts/Main.module.scss';

type MainLayoutProps = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: MainLayoutProps) {
  return (
    <div className={style.app}>
      <LeftSidebar page="/"/>
      {children}
      <RightSidebar />
    </div>
  );
}
