import icon from '../public/icon/stars.svg'
import DeckLayout from '../layouts/DeckLayout';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/Header';
import TweetWidget from '../components/TweetWidget/TweetWidget';
import { useSession } from "next-auth/react";
import NavLeft from "../components/NavLeft/NavLeft";
import NavRight from '../components/NavRight/NavRight';

export const Home = () => {
  const { data } = useSession({
    required: true,
  });
  if (data)  {
    return (
      <MainLayout>
        <NavLeft path='/' user={data.user} />
        <DeckLayout>
          <Header name='Home' href='/' icon={icon} />
          <TweetWidget />
        </DeckLayout>
        <NavRight />
      </MainLayout>
    );
  } else {
    return null
  }
};

export default Home;
