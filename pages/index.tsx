import icon from '../public/icon/stars.svg'
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import DeckLayout from '../layouts/DeckLayout';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import TweetWidget from '../components/TweetWidget/TweetWidget';
import { useSession } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type User = {
  username: string
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:8000/account/peter@email.com', {
    method: 'GET',
  });
  const data = await response.json();
  const user: User = { username: data.username}
  return { props: { user } };
};

export const Home: NextPageWithLayout<InferGetServerSidePropsType<any>> = ({ user }) => {
  const session = useSession({
    required: true,
  });
  // console.log(session);

  console.log('data', user.username);

  return (
    <>
      <h1>{user.username}</h1>
      <Header name='Home' href='/' icon={icon} session={session}/>
      <TweetWidget />
    </>
  );
};



Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout path='/'>
      <DeckLayout>{page}</DeckLayout>
    </MainLayout>
  );
};

export default Home;
