import stars_icon from '@icon/stars.svg';
import { DeckLayout } from '@layouts/DeckLayout';
import { MainLayout } from '@layouts/MainLayout';
import { DeckHeader } from '@components/DeckHeader';
import { TweetWidget } from '@components/TweetWidget/TweetWidget';
import { NavLeft } from '@components/NavLeft/NavLeft';
import { NavRight } from '@components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from '@lib/auth';
import { FC } from 'react';
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);
  if (!session) return { redirect: { destination: '/signin', permanent: false } };
  return { props: { session: session } };
};

export const Home: FC<InferGetServerSidePropsType<any>> = ({ session }) => {
  return (
    <>
      <Head>
        <title>{`Home / Twitter`}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <MainLayout>
        <NavLeft session={session} />
        <DeckLayout>
          <DeckHeader title='Home' href='/' icon={stars_icon} />
          <TweetWidget />
        </DeckLayout>
        <NavRight />
      </MainLayout>
    </>
  );
};

export default Home;
