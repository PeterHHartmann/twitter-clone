import { DeckLayout } from '@/layouts/DeckLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { Header } from '@/components/Header';
import { TweetWidget } from '@/components/TweetWidget/TweetWidget';
import { NavLeft } from '@/components/NavLeft/NavLeft';
import { NavRight } from '@/components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from '@/lib/auth';

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  const session = await getSession(req);
  if (!session) return { redirect: { destination: '/signin', permanent: false } };
  const { profile } = query
  try {
    const response = await fetch(`http://127.0.0.1:8000/profile/${profile}`, {
      method:'get',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`
      }
    })
    if(response.ok){
      return { props: { session: session, profile: profile, data: await response.json() } };
    } else {
      return { props: { session: session, profile: null } };
    }
  } catch(err) {
  }
  return { props: { session: session, profile: profile } };
};

export const Profile: React.FC<InferGetServerSidePropsType<any>> = ({ session, profile, data }) => {
  
  return (
    <MainLayout>
      <NavLeft session={session} />
      <DeckLayout>
        <Header name={profile} href='/'/>
        <TweetWidget />
      </DeckLayout>
      <NavRight />
    </MainLayout>
  );
};

export default Profile;