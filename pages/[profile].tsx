import style from '@styles/Profile.module.scss';
import { DeckLayout } from '@layouts/DeckLayout';
import { MainLayout } from '@layouts/MainLayout';
import { DeckHeader } from '@components/DeckHeader';
import { NavLeft } from '@components/NavLeft/NavLeft';
import { NavRight } from '@components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from '@lib/auth';
import { FC } from 'react';
import { Error404 } from '@components/Profile/Error404';
import Image from "next/image";
import defaultPfp from '@image/default-pfp.jpg';
// import locationIcon from ''


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
  return {
    props: {
      session: session,
      profile: profile,
      data: await response.json(),
      errorCode: errorCode,
      referer: req.headers.referer || '/',
    },
  };
};

export const Profile: FC<InferGetServerSidePropsType<any>> = ({ session, profile, data, errorCode, referer }) => {

  const isOwnProfile = session.username === profile;
  const location = 'Copenhagen, Denmark';

  return (
    <MainLayout>
      <NavLeft session={session} />
      <DeckLayout>
        {errorCode ? (
          <Error404 session={session} />
        ) : (
          <>
            <DeckHeader title={profile} subtitle={'700 tweets'} href='/' referer={referer} />
            <div className={style.banner}>{data.banner ? <Image src={data.banner} alt='' /> : null}</div>
            <div className={style.avatarContainer}>
              <Image className={style.avatar} src={defaultPfp} alt='User Avatar' width={132} height={132} />
              {isOwnProfile ? (
                <button className={style.editProfile}>Edit Profile</button>
              ) : (
                <button className={style.follow}>Follow</button>
              )}
            </div>
            <div className={style.info}>
              <span className={style.displayname}>{data.displayname}</span>
              <span className={style.username}>{data.username}</span>
              <span className={style.bio}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </span>
              <div className={style.history}>
                <span></span>
                <span></span>
              </div>
            </div>
          </>
        )}
      </DeckLayout>
      <NavRight />
    </MainLayout>
  );
};

export default Profile;