import { ButtonUploadImage } from '@components/ButtonUploadImage';
import { RemovableImage } from '@components/RemovableImage';
import { TweetTextarea } from '@components/TweetTextarea';
import { Avatar } from '@components/user/Avatar';
import { Session } from '@lib/auth';
import style from '@styles/pages/home/TweetWidget.module.scss';
import { TweetData } from './Timeline';
import { Dispatch, FC, SetStateAction, useState } from 'react';

type Props = {
    index: number;
    tweets: TweetData[];
    setTweets: Dispatch<SetStateAction<TweetData[]>>;
    session: Session;
    csrfToken: string;
    setEditOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditTweet: FC<Props> = ({ index, tweets, setTweets, session, csrfToken, setEditOpen }) => {
    const [text, setText] = useState<string | undefined>(tweets[index].text);
    const [imageUrls, setImageUrls] = useState<string[]>(tweets[index].tweet_image.map((image,) => image.path));
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [isPrivate, setIsPrivate] = useState<boolean>(tweets[index].private);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('form submitted');
        try {
            const formData = new FormData();
            formData.append('private', isPrivate.toString());
            if (text) {
                formData.append('text', text);
            }
            if (imageFiles) {
                for (const file of imageFiles) {
                    formData.append(`image-${imageFiles.indexOf(file)}`, file);
                }
            }
            const response = await fetch(`/api/tweet/${tweets[index].id}`, {
                method: 'PUT',
                headers: {
                    'x-csrf-token': csrfToken,
                },
                body: formData,
            });
            if (!response.ok) {
                console.log(response.status);
                setEditOpen(false);
            } else {
                const updatedTweets = tweets;
                updatedTweets[index].text = text;
                setTweets(updatedTweets);
                setEditOpen(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className={style.section}>
            <div className={style.avatar}>
                <Avatar src={session.avatar} width={48} height={48} />
            </div>
            <form className={style.form} action='POST' onSubmit={handleSubmit}>
                <TweetTextarea value={text} setValue={setText} />
                <div className={style.imgs}>
                    {imageUrls.map((_, index) => (
                        <RemovableImage
                            key={index}
                            imageUrls={imageUrls}
                            setImageUrls={setImageUrls}
                            imageFiles={imageFiles}
                            setImageFiles={setImageFiles}
                            index={index}
                        />
                    ))}
                </div>
                <div className={style.bottom}>
                    <ButtonUploadImage
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                        imageFiles={imageFiles}
                        setImageFiles={setImageFiles}
                    />
                    <div className={style.privateSwitch}>
                        <label htmlFor='privateSwitch'>
                            <input type='checkbox' name='privateSwitch' id='privateSwitch' defaultChecked={isPrivate} />
                            <span onClick={() => setIsPrivate(!isPrivate)}></span>
                        </label>
                        <p>Private</p>
                    </div>
                    <button className={style.submit} data-active={text || imageUrls.length > 0 ? true : null}>
                        <span>Apply</span>
                    </button>
                </div>
            </form>
        </section>
    );
};
