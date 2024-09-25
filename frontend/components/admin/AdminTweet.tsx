import style from '@styles/components/Tweet.module.scss';
import { TweetData } from '@components/timeline/Timeline';
import { AdminSession } from '@lib/auth';
import { FC, MouseEvent, useState } from 'react';
import { Avatar } from '@components/user/Avatar';
import Image from 'next/image';
import { getExternalApiUrl } from '@lib/config';
import moreIcon from '@icon/more.svg';

type Props = {
    tweetData: TweetData;
    setTweets: React.Dispatch<React.SetStateAction<TweetData[]>>;
    session: AdminSession;
    csrfToken: string;
    tweets: TweetData[];
};

export const AdminTweet: FC<Props> = ({ tweetData, csrfToken, tweets, setTweets }) => {
    const [moreOpen, setMoreOpen] = useState<boolean>(false);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const createdAtMonth = new Date(tweetData.created_at).toLocaleString('default', { month: 'short' });
    const createdAtDay = new Date(tweetData.created_at).toLocaleString('default', { day: 'numeric' });
    const handleDeleteClicked = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        setDeleteOpen(true);
        setMoreOpen(false);
    };
    const handleDeleteConfirmed = async (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        try {
            const response = await fetch(`/api/admin/tweet/${tweetData.id}`, {
                method: 'delete',
                headers: {
                    'x-csrf-token': csrfToken,
                },
            });
            if (!response.ok) {
                console.log(response.status);
            } else {
                setTweets(tweets.filter((_, index) => index !== tweets.indexOf(tweetData)));
            }
            setMoreOpen(false);
            setDeleteOpen(false);
        } catch (err) {}
    };
    return (
        <div className={style.container}>
            <div className={style.avatar}>
                <Avatar src={tweetData.profile.avatar ? tweetData.profile.avatar.path : undefined} width={48} height={48} />
            </div>
            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.info}>
                        <a href={`/${tweetData.profile.username}`}>
                            <span>{`${tweetData.profile.displayname}`}</span>
                            <span>{` @${tweetData.profile.username} `}</span>
                            <span>{`· ${createdAtMonth} ${createdAtDay}`}</span>
                            {tweetData.private ? <span>{` · private `}</span> : null}
                        </a>
                    </div>
                    <div className={style.moreBtn} onClick={() => setMoreOpen(!moreOpen)}>
                        {moreOpen ? (
                            <div className={style.moreOpen}>
                                <Image src={moreIcon} alt='' width={18} height={18} />
                                <button className={style.deleteBtn} onClick={handleDeleteClicked}>
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <Image src={moreIcon} alt='' width={18} height={18} />
                        )}
                    </div>
                </div>
                <div>
                    <span>{tweetData.text}</span>
                </div>
                {tweetData.tweet_image.length > 0 ? (
                    <div className={style.imageContainer}>
                        {tweetData.tweet_image.map((image, index) => (
                            <div key={index} className={style.image}>
                                <Image
                                    src={getExternalApiUrl() + image.path}
                                    alt=''
                                    fill={true}
                                    sizes='(max-width: 1024px) 35vw, (max-width: 1920px) 35vw'
                                    priority={true}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            {deleteOpen ? (
                <div className={style.modal} onClick={() => setDeleteOpen(false)}>
                    <section className={style.deleteConfirmation} onClick={(event: MouseEvent) => event.stopPropagation()}>
                        <h2>Delete tweet?</h2>
                        <p>
                            This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow
                            you, and from Twitter search results.
                        </p>
                        <button className={style.deleteBtn} onClick={handleDeleteConfirmed}>
                            Delete
                        </button>
                        <button className={style.cancelBtn} onClick={() => setDeleteOpen(false)}>
                            Cancel
                        </button>
                    </section>
                </div>
            ) : null}
        </div>
    );
};
