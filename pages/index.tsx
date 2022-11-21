import icon from '@/public/icon/stars.svg';
import DeckLayout from '@/layouts/DeckLayout';
import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Header';
import TweetWidget from '@/components/TweetWidget/TweetWidget';
import NavLeft from '@/components/NavLeft/NavLeft';
import NavRight from '@/components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from '@/services/session-service';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  if (!session) return { redirect: { destination: '/signin', permanent: true } };
  return { props: { session } };
};

export const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ session }) => {
  return (
    <MainLayout>
      <NavLeft path='/' user={session} />
      <DeckLayout>
        <Header name='Home' href='/' icon={icon} />
        <TweetWidget />
      </DeckLayout>
      <NavRight />
    </MainLayout>
  );
};

export default Home;
