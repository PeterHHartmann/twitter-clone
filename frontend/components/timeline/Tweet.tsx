import style from '@styles/components/Tweet.module.scss';
import { Avatar } from '@components/user/Avatar';
import { getExternalApiUrl } from '@lib/config';
import Image from 'next/image';
import { FC, MouseEvent, useState } from 'react';
import moreIcon from '@icon/more.svg';
import commentIcon from '@icon/comment.svg';
import retweetIcon from '@icon/retweet.svg';
import likeIcon from '@icon/like.svg';
import tweetUtilsIcon from '@icon/tweet-utils.svg';
import flagIcon from '@icon/flag.svg';
import { Session } from '@lib/auth';
import { EditTweet } from './EditTweet';
import { TweetData } from './Timeline';

type Props = {
    tweetData: TweetData;
    setTweets: React.Dispatch<React.SetStateAction<TweetData[]>>;
    session: Session;
    csrfToken: string;
    tweets: TweetData[];
};

export const Tweet: FC<Props> = ({ tweetData, session, csrfToken, tweets, setTweets }) => {
    const [moreOpen, setMoreOpen] = useState<boolean>(false);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const createdAtMonth = new Date(tweetData.created_at).toLocaleString('default', { month: 'short' });
    const createdAtDay = new Date(tweetData.created_at).toLocaleString('default', { day: 'numeric' });

    const handleEditClicked = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        setEditOpen(true);
        setMoreOpen(false);
    };

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
            const response = await fetch(`/api/tweet/${tweetData.id}`, {
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
                                {session.id === tweetData.author ? (
                                    <>
                                        <button className={style.editBtn} onClick={handleEditClicked}>
                                            Edit
                                        </button>
                                        <button className={style.deleteBtn} onClick={handleDeleteClicked}>
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <div className={style.report}>
                                        <Image src={flagIcon} alt='' width={18} height={18} />
                                        <span>Report tweet</span>
                                    </div>
                                )}
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
                                    width={100}
                                    height={100}
                                    sizes='(max-width: 1024px) 35vw, (max-width: 1920px) 35vw'
                                    priority={true}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
                <div className={style.footer}>
                    <Image src={commentIcon} alt='' width={18} height={18} />
                    <Image src={retweetIcon} alt='' width={18} height={18} />
                    <Image src={likeIcon} alt='' width={18} height={18} />
                    <Image src={tweetUtilsIcon} alt='' width={18} height={18} />
                </div>
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
            {editOpen ? (
                <div className={style.modal} onClick={() => setEditOpen(false)}>
                    <div className={style.editContainer} onClick={(event: MouseEvent) => event.stopPropagation()}>
                        <EditTweet
                            index={tweets.indexOf(tweetData)}
                            tweets={tweets}
                            setTweets={setTweets}
                            session={session}
                            csrfToken={csrfToken}
                            setEditOpen={setEditOpen}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};
