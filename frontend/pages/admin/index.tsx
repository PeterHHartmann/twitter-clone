import style from '@styles/pages/admin/AdminHome.module.scss';
import { DeckHeader } from '@components/deck/DeckHeader';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAdminSession, getCsrfToken } from '@lib/auth';
import { FC } from 'react';
import { getExternalApiUrl } from '@lib/config';
import { AdminTimeline } from '@components/admin/AdminTimeline';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getAdminSession(req);
    if (!session) return { redirect: { destination: '/admin/signin', permanent: false } };
    const csrfToken = getCsrfToken(req, res);
    const { tweets } = await fetch(`${getExternalApiUrl()}/admin/tweets?page=1`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${session.adminAccessToken}`,
        },
    }).then((res) => res.json());
    return { props: { session: session, csrfToken: csrfToken, tweets: tweets } };
};

export const AdminHome: FC<InferGetServerSidePropsType<any>> = ({ session, csrfToken, tweets }) => {
    const { reload } = useRouter();

    const handleSignout = async () => {
        try {
            const response = await fetch(`/api/admin/signout`, {
                method: 'post',
                headers: {
                    'x-csrf-token': csrfToken,
                },
            });
            if (response.ok) {
                reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main className={style.main}>
            <button className={style.logout} onClick={handleSignout}>
                Sign out
            </button>
            <div className={style.deck}>
                <DeckHeader title={`${session.username} - All Tweets`} href='/' />
                <AdminTimeline session={session} csrfToken={csrfToken} initialTweets={tweets} />
            </div>
        </main>
    );
};

export default AdminHome;
