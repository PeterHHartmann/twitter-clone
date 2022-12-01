import style from '@styles/components/TweetWidget/TweetWidget.module.scss';
import { ButtonUploadImage } from '@components/TweetWidget/ButtonUploadImage';
import { RemovableImage } from '@components/TweetWidget/RemovableImage';
import React, { FC, useState } from 'react';
import { TweetTextarea } from '@components/TweetWidget/TweetTextarea';
import Image from 'next/image';
import default_pfp from '@image/default-pfp.jpg';

export const TweetWidget: FC = () => {
  const [text, setText] = useState<string | undefined>('');
  const [images, setImages] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <section className={style.section}>
      <Image className={style.profile} src={default_pfp} alt='' priority={true}/>
      <form className={style.form} action='POST' onSubmit={handleSubmit}>
        <TweetTextarea value={text} setValue={setText} />
        <div className={style.imgs}>
          {images.map((_, index) => (
            <RemovableImage key={index} images={images} setImages={setImages} index={index} />
          ))}
        </div>
        <div className={style.bottom}>
          <ButtonUploadImage images={images} setImages={setImages} />
          <button className={style.submit} data-active={(text || images.length > 0) ? true : null}>
            <span>Tweet</span>
          </button>
        </div>
      </form>
    </section>
  );
};