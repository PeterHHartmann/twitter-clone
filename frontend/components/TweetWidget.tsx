import style from '@styles/pages/home/TweetWidget.module.scss';
import { ButtonUploadImage } from '@components/ButtonUploadImage';
import { RemovableImage } from '@components/RemovableImage';
import React, { FC, useState } from 'react';
import { TweetTextarea } from '@components/TweetTextarea';
import { Session } from '@lib/auth';
import { Avatar } from '@components/user/Avatar';
import { useRouter } from 'next/router';

export const TweetWidget: FC<{ session: Session; csrfToken: string; }> = ({ session, csrfToken }) => {
    const [text, setText] = useState<string | undefined>('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const { reload } = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            const response = await fetch('/api/tweet', {
                method: 'post',
                headers: {
                    'x-csrf-token': csrfToken,
                },
                body: formData,
            });
            if (response.ok) {
                reload();
            } else {
                console.log(response.status);
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
                        <span>Tweet</span>
                    </button>
                </div>
            </form>
        </section>
    );
};
