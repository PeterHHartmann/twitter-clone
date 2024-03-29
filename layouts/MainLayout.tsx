import type { PropsWithChildren } from 'react';
import style from '../styles/layouts/MainLayout.module.scss';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={style.app}>{children}</div>
  );
}

export default Layout;