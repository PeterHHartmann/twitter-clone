import style from '@/styles/layouts/MainLayout.module.scss';
import type { PropsWithChildren } from 'react';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.app}>{children}</div>;
};