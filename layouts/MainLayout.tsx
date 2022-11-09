import { Session } from "next-auth";
import type { PropsWithChildren } from 'react';
import NavLeft from '../components/NavLeft/NavLeft';
import NavRight from '../components/NavRight/NavRight';
import style from '../styles/layouts/Main.module.scss';

type Props = PropsWithChildren & {
  path: string
}

export const Layout: React.FC<Props> = ({path, children}) => {
  return (
    <div className={style.app}>
      <NavLeft path={path} />
      {children}
      <NavRight />
    </div>
  );
}

export default Layout;