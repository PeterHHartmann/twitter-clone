import style from '@styles/components/Timeline.module.scss';
import { AdminSession } from '@lib/auth';
import { FC, PropsWithChildren, useState } from 'react';
import { TweetData } from '@components/timeline/Timeline';
import { AdminTweet } from './AdminTweet';

type AdminTimelineProps = PropsWithChildren & {
    initialTweets: TweetData[];
    session: AdminSession;
    csrfToken: string;
};

export const AdminTimeline: FC<AdminTimelineProps> = ({ children, initialTweets, session, csrfToken }) => {
    const [tweets, setTweets] = useState<TweetData[]>(initialTweets);
    const [page, setPage] = useState<number>(1);

    const handleLoadMore = async () => {
        try {
            const response = await fetch(`/api/admin/tweets?page=${page + 1}`, {
                method: 'get',
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
        <>
            {children}
            <div className={style.container}>
                {tweets.map((tweet, index) => (
                    <AdminTweet
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
        </>
    );
};
