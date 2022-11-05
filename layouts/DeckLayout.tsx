import style from '../styles/layouts/Deck.module.scss';
import type { ReactNode } from 'react';

type DeckLayoutProps = {
  children: ReactNode | ReactNode[];
};

export default function DeckLayout({ children }: DeckLayoutProps) {
  return <main className={style.deck}>{children}</main>;
}
