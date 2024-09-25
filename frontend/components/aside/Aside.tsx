import style from '@styles/layouts/MainLayout.module.scss';
import { FollowNav } from '@components/aside/FollowNav';
import { SearchBar } from '@components/aside/SearchBar';
import { TrendsNav } from '@components/aside/TrendsNav';
import { FC } from 'react';
import { Session } from '@lib/auth';

type Props = {
    session: Session;
    csrfToken: string;
};

export const Aside: FC<Props> = ({ session, csrfToken }) => {
    return (
        <aside className={style.aside}>
            <div>
                <SearchBar />
                <TrendsNav />
                <FollowNav session={session} csrfToken={csrfToken} />
            </div>
        </aside>
    );
};
