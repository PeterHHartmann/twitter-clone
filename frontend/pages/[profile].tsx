import style from '@styles/pages/profile/Profile.module.scss';
import { Error404 } from '@components/Error404';
import { MainLayout } from '@layouts/MainLayout';
import { DeckHeader } from '@components/deck/DeckHeader';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getSession } from '@lib/auth';
import { MouseEvent, ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import calendarIcon from '@icon/calendar.svg';
import locationIcon from '@icon/location.svg';
import Link from 'next/link';
import { EditProfile } from '@components/EditProfile';
import { Avatar } from '@components/user/Avatar';
import { getExternalApiUrl } from '@lib/config';
import { NextPageWithLayout } from './_app';
import { Banner } from '@components/user/Banner';
import { Timeline } from '@components/timeline/Timeline';

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const session = await getSession(req);
    if (!session) return { redirect: { destination: '/signin', permanent: false } };
    const csrfToken = getCsrfToken(req, res);
    const profileData = await fetch(`${getExternalApiUrl()}/profile/${query.profile}`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });

    const { tweets } = await fetch(`${getExternalApiUrl()}/tweets/${query.profile}?page=1`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    }).then((res) => res.json());
    const errorCode = profileData.ok ? false : 404;
    return {
        props: {
            session: session,
            csrfToken: csrfToken,
            profile: query.profile,
            profileData: await profileData.json(),
            errorCode: errorCode,
            referer: req.headers.referer || '/',
            initialTweets: tweets || null,
        },
    };
};

export type ProfileInfo = {
    avatar?: string;
    banner?: string;
    bio?: string;
    created_at: string;
    displayname: string;
    id: number;
    last_modified: string;
    location?: string;
    username: string;
    isPrivate: boolean;
};

export const Profile: NextPageWithLayout<InferGetServerSidePropsType<any>> = ({
    session,
    csrfToken,
    profile,
    profileData,
    errorCode,
    referer,
    initialTweets,
}) => {
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>(profileData);
    const joinedAt = new Date(profileData.created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(true);
    const following = '137';
    const followers = '36';

    const handleFollow = async (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await fetch(`/api/follow/${profileInfo.id}`, {
                method: 'post',
                headers: {
                    'x-csrf-token': csrfToken,
                },
            });
            if (response.ok) {
                setIsFollowing(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnfollow = async (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await fetch(`/api/follow/${profileInfo.id}`, {
                method: 'delete',
                headers: {
                    'x-csrf-token': csrfToken,
                },
            });
            if (response.ok) {
                setIsFollowing(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (profileData.username !== session.username) {
            fetch(`/api/follow/${profileInfo.id}`, {
                method: 'get',
            })
                .then((response) => response.json())
                .then((data) => setIsFollowing(data.following));
        }
        return () => {};
    });

    return (
        <>
            {editOpen ? (
                <EditProfile
                    csrfToken={csrfToken}
                    setIsOpen={setEditOpen}
                    session={session}
                    profileInfo={profileInfo}
                    setProfileInfo={setProfileInfo}
                />
            ) : null}
            {errorCode ? (
                <Error404 />
            ) : (
                <>
                    <DeckHeader title={profile} subtitle={'773 tweets'} href='/' referer={referer} />
                    <div className={style.banner}>
                        <Banner src={profileInfo.banner} />
                    </div>
                    <div className={style.avatarContainer}>
                        <div className={style.avatar}>
                            <Avatar src={profileInfo.avatar} width={140} height={140} />
                        </div>
                        {session.username === profile ? (
                            <button className={style.editBtn} onClick={() => setEditOpen(true)}>
                                Edit Profile
                            </button>
                        ) : isFollowing ? (
                            <button className={style.unfollowBtn} onClick={handleUnfollow}>
                                Unfollow
                            </button>
                        ) : isFollowing ? (
                            <button className={style.unfollowBtn} onClick={handleUnfollow}>
                                Unfollow
                            </button>
                        ) : (
                            <button className={style.followBtn} onClick={handleFollow}>
                                Follow
                            </button>
                        )}
                    </div>
                    <div className={style.info}>
                        <div className={style.names}>
                            <div className={style.displayname}>{profileInfo.displayname}</div>
                            <div className={style.username}>{`@${profileInfo.username}`}</div>
                        </div>
                        {profileInfo.bio ? <span className={style.bio}>{profileInfo.bio}</span> : null}
                        <div className={style.history}>
                            {profileInfo.location ? (
                                <div>
                                    <Image src={locationIcon} alt='' width={19.2} height={19.2} />
                                    <span>{profileInfo.location}</span>
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
                    <div className={style.contentOptions}>
                        <Link className={style.optionCurrent} href={profile} prefetch={false}>
                            <span>Tweets</span>
                        </Link>
                        <Link className={style.option} href={`${profile}/with_replies`} prefetch={false}>
                            <span>Tweets & replies</span>
                        </Link>
                        <Link className={style.option} href={`${profile}/media`} prefetch={false}>
                            <span>Media</span>
                        </Link>
                        <Link className={style.option} href={`${profile}/likes`} prefetch={false}>
                            <span>Likes</span>
                        </Link>
                    </div>
                    <Timeline
                        initialTweets={initialTweets}
                        fetchTweetsUrl={`/api/tweets/${profile}`}
                        session={session}
                        csrfToken={csrfToken}
                    />
                </>
            )}
        </>
    );
};

Profile.getLayout = function getLayout(page: ReactElement) {
    const session = page.props.session;
    const profileData = page.props.profileData;
    const title = profileData.username
        ? `${profileData.displayname} (@${profileData.username}) / Twitter`
        : `User doesn't exist / Twitter`;
    return (
        <MainLayout session={session} csrfToken={page.props.csrfToken} title={title}>
            {page}
        </MainLayout>
    );
};

export default Profile;
