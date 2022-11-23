import stars_icon from '@/public/icon/stars.svg';
import { DeckLayout } from '@/layouts/DeckLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { Header } from '@/components/Header';
import { TweetWidget } from '@/components/TweetWidget/TweetWidget';
import { NavLeft } from '@/components/NavLeft/NavLeft';
import { NavRight } from '@/components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from '@/lib/auth';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req);
  if (!session) return { redirect: { destination: '/signin', permanent: false } };
  return { props: { session: session } };
};

export const Home: React.FC<InferGetServerSidePropsType<any>> = ({ session }) => {
  return (
    <MainLayout>
      <NavLeft session={session} />
      <DeckLayout>
        <Header name='Home' href='/' icon={stars_icon} />
        <TweetWidget />
      </DeckLayout>
      <NavRight />
    </MainLayout>
  );
};

export default Home;
