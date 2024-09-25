import style from '@styles/layouts/MainLayout.module.scss';
import { Aside } from '@components/aside/Aside';
import { CustomHead } from '@components/document/CustomHead';
import { Header } from '@components/header/Header';
import { Session } from '@lib/auth';
import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    session: Session;
    csrfToken: string;
    title: string;
};

export const MainLayout: FC<Props> = ({ children, session, csrfToken, title }) => {
    return (
        <>
            <CustomHead title={title} />
            <div className={style.app}>
                <Header session={session} csrfToken={csrfToken} />
                <main className={style.main}>
                    <div className={style.deck}>{children}</div>
                    <Aside session={session} csrfToken={csrfToken} />
                </main>
            </div >
        </>
    );
};
