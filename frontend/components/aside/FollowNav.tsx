import { Avatar } from '@components/user/Avatar';
import { Session } from '@lib/auth';
import style from '@styles/layouts/aside/FollowNav.module.scss';
import { FC, MouseEvent, useEffect, useState } from 'react';

type Profile = {
    avatar: {
        path?: string;
    };
    bio?: string;
    created_at: string;
    displayname: string;
    id: number;
    last_modified: string;
    location?: string;
    username: string;
    isPrivate: boolean;
};

type UserLinkPops = {
    profile: Profile;
    csrfToken: string;
};

const UserLink: FC<UserLinkPops> = ({ profile, csrfToken }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const handleFollow = async (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await fetch(`/api/follow/${profile.id}`, {
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
            const response = await fetch(`/api/follow/${profile.id}`, {
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

    return (
        <a className={style.user} href={`/${profile.username}`}>
            <Avatar src={profile.avatar ? profile.avatar.path : undefined} width={48} height={48} />
            <div>
                <p className={style.displayname}>{profile.displayname}</p>
                <p className={style.username}>{profile.username}</p>
            </div>
            {isFollowing ? (
                <button className={style.unfollowBtn} onClick={handleUnfollow}>
                    Unfollow
                </button>
            ) : (
                <button className={style.followBtn} onClick={handleFollow}>
                    Follow
                </button>
            )}
        </a>
    );
};

type FollowNavProps = {
    session: Session;
    csrfToken: string;
};

export const FollowNav: FC<FollowNavProps> = ({ csrfToken }) => {
    const [whoToFollow, setWhoToFollow] = useState<Profile[]>([]);

    useEffect(() => {
        if (whoToFollow && whoToFollow.length <= 0) {
            fetch(`/api/follow/whotofollow`, {
                method: 'get',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.profiles.length > 0) {
                        setWhoToFollow(data.profiles);
                    }
                })
                .catch((err) => console.log(err));
        }
        return () => {};
    });

    if (!whoToFollow || whoToFollow.length < 1) {
        return null;
    }

    return (
        <nav className={style.nav}>
            <h3>Who to follow</h3>
            {whoToFollow.map((profile, index) => (
                <UserLink key={index} profile={profile} csrfToken={csrfToken} />
            ))}
        </nav>
    );
};
