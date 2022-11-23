import style from '@/styles/layouts/DeckLayout.module.scss';
import type { FC, PropsWithChildren } from 'react';

export const DeckLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className={style.deck}>{children}</main>;
};
