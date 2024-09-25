import style from '@styles/components/Timeline.module.scss';
import { Session } from '@lib/auth';
import { FC, PropsWithChildren, useState } from 'react';
import { Tweet } from './Tweet';

type Props = PropsWithChildren & {
    initialTweets: TweetData[];
    fetchTweetsUrl: string;
    session: Session;
    csrfToken: string;
};

export type TweetData = {
    author: number;
    profile: {
        avatar: {
            path: string | undefined;
        };
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
    created_at: string;
    id: number;
    last_modified: string;
    text?: string;
    tweet_image: TweetImage[];
    private: boolean;
};

export type TweetImage = {
    id: number;
    last_modified: string;
    path: string;
    tweet_id: number;
};

export const Timeline: FC<Props> = ({ initialTweets, fetchTweetsUrl, session, csrfToken }) => {
    const [tweets, setTweets] = useState<TweetData[]>(initialTweets);
    const [page, setPage] = useState<number>(1);

    const handleLoadMore = async () => {
        try {
            const response = await fetch(`${fetchTweetsUrl}?page=${page + 1}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (response.ok) {
                setPage(page + 1);
                const data = await response.json();
                const newTweets = tweets.concat(data.tweets);
                setTweets(newTweets);
            } else {
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={style.container}>
            {tweets.map((tweet, index) => (
                <Tweet
                    tweetData={tweet}
                    key={index}
                    session={session}
                    csrfToken={csrfToken}
                    tweets={tweets}
                    setTweets={setTweets}
                />
            ))}
            {tweets.length > 9 ? (
                <button className={style.loadMoreBtn} onClick={handleLoadMore}>
                    Load more
                </button>
            ) : null}
        </div>
    );
};
