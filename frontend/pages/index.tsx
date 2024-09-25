import stars_icon from '@icon/stars.svg';
import { MainLayout } from '@layouts/MainLayout';
import { DeckHeader } from '@components/deck/DeckHeader';
import { TweetWidget } from '@components/TweetWidget';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession } from '@lib/auth';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { getExternalApiUrl } from '@lib/config';
import { Timeline } from '@components/timeline/Timeline';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession(req);
    if (!session) return { redirect: { destination: '/signin', permanent: false } };
    const csrfToken = getCsrfToken(req, res);
    const { tweets } = await fetch(`${getExternalApiUrl()}/tweets?page=1`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    }).then((res) => res.json());
    return { props: { session: session, csrfToken: csrfToken, initialTweets: tweets || null } };
};

export const Home: NextPageWithLayout<InferGetServerSidePropsType<any>> = ({ session, csrfToken, initialTweets }) => {
    return (
        <>
            <DeckHeader title='Home' href='/' icon={stars_icon} />
            <TweetWidget session={session} csrfToken={csrfToken} />
            <Timeline initialTweets={initialTweets} fetchTweetsUrl={`/api/tweets`} session={session} csrfToken={csrfToken} />
        </>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout session={page.props.session} csrfToken={page.props.csrfToken} title='Home / Twitter'>
            {page}
        </MainLayout>
    );
};

export default Home;
