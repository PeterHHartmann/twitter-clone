import style from '../styles/layouts/Deck.module.scss';
import type { PropsWithChildren } from 'react';

export const DeckLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className={style.deck}>{children}</main>;
};

export default DeckLayout;
