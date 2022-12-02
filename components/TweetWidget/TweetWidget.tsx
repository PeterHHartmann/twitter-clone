import style from '@styles/components/TweetWidget/TweetWidget.module.scss';
import { ButtonUploadImage } from '@components/TweetWidget/ButtonUploadImage';
import { RemovableImage } from '@components/TweetWidget/RemovableImage';
import React, { FC, useState } from 'react';
import { TweetTextarea } from '@components/TweetWidget/TweetTextarea';
import Image from 'next/image';
import default_pfp from '@image/default-pfp.jpg';
import { Session } from '@lib/auth';

export const TweetWidget: FC<{session: Session, csrfToken: string}> = ({session, csrfToken}) => {
  const [text, setText] = useState<string | undefined>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form submitted');
    try {
      const formData = new FormData();
      if (text) {
        formData.append('text', text);
      }
      if (imageFiles) {
        for (const file of imageFiles) {
          formData.append(`image-${imageFiles.indexOf(file)}`, file)
        }
      }
      const response = await fetch('/api/profile/tweet', {
        method: 'post',
        headers: {
          'x-csrf-token': csrfToken
        },
        body: formData
      })
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={style.section}>
      <div className={style.avatar}>
        {session.avatar ? (
          <Image src={session.avatar} alt='' width={48} height={48} priority={true} />
        ) : (
          <Image src={default_pfp} alt='' width={48} height={48} priority={true} />
        )}
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
          <button className={style.submit} data-active={text || imageUrls.length > 0 ? true : null}>
            <span>Tweet</span>
          </button>
        </div>
      </form>
    </section>
  );
};