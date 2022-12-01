import style from '@styles/Profile.module.scss';
import { DeckLayout } from '@layouts/DeckLayout';
import { MainLayout } from '@layouts/MainLayout';
import { DeckHeader } from '@components/DeckHeader';
import { NavLeft } from '@components/NavLeft/NavLeft';
import { NavRight } from '@components/NavRight/NavRight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession } from '@lib/auth';
import { FC } from 'react';
import { Error404 } from '@components/Profile/Error404';
import Image from "next/image";
import defaultPfp from '@image/default-pfp.jpg';
import calendarIcon from '@icon/calendar.svg';
import locationIcon from '@icon/location.svg';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { EditProfile } from "@components/Profile/EditProfile";

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await getSession(req);
  if (!session) return { redirect: { destination: '/signin', permanent: false } };
  const csrfToken = getCsrfToken(req);
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
      csrfToken: csrfToken,
      profile: profile,
      data: await response.json(),
      errorCode: errorCode,
      referer: req.headers.referer || '/',
    },
  };
};

export const Profile: FC<InferGetServerSidePropsType<any>> = ({ session, csrfToken, profile, data, errorCode, referer }) => {
  const joinedAt = new Date(data.created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const following = '137';
  const followers = '36';

  return (
    <>
      <Head>
        {data.username ? (
          <title>{`${data.displayname} (@${data.username}) / Twitter`}</title>
        ) : (
          <title>{`User doesn't exist / Twitter`}</title>
        )}

        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width, maximum-scale=1, user-scalable=0, viewport-fit=cover'
        />
      </Head>
      {editOpen ? <EditProfile csrfToken={csrfToken} setIsOpen={setEditOpen} session={session} data={data} /> : null}
      <MainLayout>
        <NavLeft session={session} />
        <DeckLayout>
          {errorCode ? (
            <Error404 session={session} />
          ) : (
            <>
              <DeckHeader title={profile} subtitle={'773 tweets'} href='/' referer={referer} />
              <div className={style.banner}>
                {data.banner ? <img src={'http://127.0.0.1:8000' + data.banner} alt='' /> : null}
              </div>
              <div className={style.avatarContainer}>
                <div className={style.avatar}>
                  {data.avatar ? (
                    <img width={140} height={140} src={'http://127.0.0.1:8000' + data.avatar} alt='' />
                  ) : (
                    <Image
                      className={style.avatar}
                      src={defaultPfp}
                      alt='User Avatar'
                      width={140}
                      height={140}
                      priority={true}
                    />
                  )}
                </div>
                {session.username === profile ? (
                  <button className={style.editBtn} onClick={() => setEditOpen(true)}>
                    Edit Profile
                  </button>
                ) : (
                  <button className={style.followBtn}>Follow</button>
                )}
              </div>
              <div className={style.info}>
                <div className={style.names}>
                  <div className={style.displayname}>{data.displayname}</div>
                  <div className={style.username}>{`@${data.username}`}</div>
                </div>
                {data.bio ? <span className={style.bio}>{data.bio}</span> : null}
                <div className={style.history}>
                  {data.location ? (
                    <div>
                      <Image src={locationIcon} alt='' width={19.2} height={19.2} />
                      <span>{data.location}</span>
                    </div>
                  ) : null}
                  {joinedAt ? (
                    <div>
                      <Image src={calendarIcon} alt='' width={19.2} height={19.2} />
                      <span>{`Joined ${joinedAt}`}</span>
                    </div>
                  ) : null}
                </div>

                <div className={style.followInfo}>
                  <span>
                    <strong>{following}&nbsp;</strong>Following
                  </span>
                  <span>
                    <strong>{followers}&nbsp;</strong>Followers
                  </span>
                </div>
              </div>
              <div className={style.userContent}>
                <div className={style.contentOptions}>
                  <Link className={style.optionCurrent} href={profile}>
                    <span>Tweets</span>
                  </Link>
                  <Link className={style.option} href={`${profile}/with_replies`}>
                    <span>Tweets & replies</span>
                  </Link>
                  <Link className={style.option} href={`${profile}/media`}>
                    <span>Media</span>
                  </Link>
                  <Link className={style.option} href={`${profile}/likes`}>
                    <span>Likes</span>
                  </Link>
                </div>
                <div className={style.timeline}></div>
              </div>
            </>
          )}
        </DeckLayout>
        <NavRight />
      </MainLayout>
    </>
  );
};

export default Profile;