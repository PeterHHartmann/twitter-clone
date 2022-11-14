import style from '../../styles/components/TweetWidget/Widget.module.scss';
import ButtonUploadImage from './ButtonUploadImage'
import RemovableImage from "./RemovableImage";
import React, { useState } from 'react';
import TweetTextarea from "./TweetTextarea";
import Image from 'next/image';
import default_pfp from '../../public/img/default-pfp.jpg'

export const TweetWidget: React.FC = () => {
  const [text, setText] = useState<string | undefined>("")
  const [images, setImages] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <section className={style.section}>
      <Image className={style.profile} src={default_pfp} alt='' />
      <form className={style.form} action='POST' onSubmit={handleSubmit}>
        <TweetTextarea value={text} setValue={setText}/>
        <div className={style.imgs}>
          {images.map((_, index) => (
            <RemovableImage key={index} images={images} setImages={setImages} index={index}/>
          ))}
        </div>
        <div className={style.bottom}>
          <ButtonUploadImage images={images} setImages={setImages}/>
          <button className={style.submit}>
            <span>Tweet</span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default TweetWidget