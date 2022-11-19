import icon from '../public/icon/stars.svg'
import DeckLayout from '../layouts/DeckLayout';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import TweetWidget from '../components/TweetWidget/TweetWidget';
import { useSession } from "next-auth/react";
import NavLeft from "../components/NavLeft/NavLeft";
import NavRight from '../components/NavRight/NavRight';

export const Home = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'authenticated') {
    return (
      <MainLayout>
        <NavLeft path='/' user={session.user} />
        <DeckLayout>
          <Header name='Home' href='/' icon={icon} />
          <TweetWidget />
        </DeckLayout>
        <NavRight />
      </MainLayout>
    );
  }
  return <span>Redirecting</span>
};

export default Home;
