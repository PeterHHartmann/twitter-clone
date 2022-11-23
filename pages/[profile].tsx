import { DeckLayout } from '@/layouts/DeckLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { Header } from '@/components/Header';
import { TweetWidget } from '@/components/TweetWidget/TweetWidget';
import { NavLeft } from '@/components/NavLeft/NavLeft';
import { NavRight } from '@/components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from '@/lib/auth';
import { FC } from 'react';
import { Error404 } from "@/components/ProfileError/Error404";

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req);
  if (!session) return { redirect: { destination: '/signin', permanent: false } };
  const { profile } = query;
  const response = await fetch(`http://127.0.0.1:8000/profile/${profile}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const errorCode = response.ok ? false : 404;
  return { props: { session: session, profile: profile, data: await response.json(), errorCode: errorCode } };
};

export const Profile: FC<InferGetServerSidePropsType<any>> = ({ session, profile, data, errorCode }) => {
  return (
    <MainLayout>
      <NavLeft session={session} />
      <DeckLayout>
        {errorCode ? (
          <Error404 session={session} />
        ) : (
          <>
            <Header name={profile} href='/' />
            <TweetWidget />
          </>
        )}
      </DeckLayout>
      <NavRight />
    </MainLayout>
  );
};

export default Profile;