import style from '@styles/layouts/MainLayout.module.scss';
import type { FC, PropsWithChildren } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.app}>{children}</div>;
};