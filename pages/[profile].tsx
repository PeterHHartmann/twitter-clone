import icon from '@/public/icon/stars.svg';
import DeckLayout from '@/layouts/DeckLayout';
import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Header';
import TweetWidget from '@/components/TweetWidget/TweetWidget';
import NavLeft from '@/components/NavLeft/NavLeft';
import NavRight from '@/components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from '@/services/auth';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  const session = await getSession(req);
  if (!session) return { redirect: { destination: '/signin', permanent: false } };
  const { profile } = query
  try {
    const response = await fetch(`http://127.0.0.1:8000/profile/${profile}`, {
      method:'get'
    })
    return { props: { session: session, profile: profile, data: await response.json() } };
  } catch(e) {
    console.log(e);
  }

  return { props: { } };
};

export const Profile: React.FC<InferGetServerSidePropsType<any>> = ({ session, profile, data }) => {
  console.log(profile);
  console.log(data);
  
  return (
    <MainLayout>
      <NavLeft path='/profile' session={session} />
      <DeckLayout>
        <Header name={profile} href='/'/>
        <TweetWidget />
      </DeckLayout>
      <NavRight />
    </MainLayout>
  );
};

export default Profile;