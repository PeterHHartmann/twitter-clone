import type { PropsWithChildren } from 'react';
import NavLeft from '../components/NavLeft/NavLeft';
import NavRight from '../components/NavRight/NavRight';
import style from '../styles/layouts/Main.module.scss';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={style.app}>
      <NavLeft page='/' />
      {children}
      <NavRight />
    </div>
  );
}

export default Layout;