import style from '../../styles/components/TweetWidget/Widget.module.scss';
import ButtonUploadImage from './ButtonUploadImage'
import RemovableImage from "./RemovableImage";
import React, { useState } from 'react';
import TweetTextarea from "./TweetTextarea";

export default function TweetWidget() {
  const [text, setText] = useState<string | undefined>("")
  const [images, setImages] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <section className={style.section}>
      <img className={style.profile} src='/img/default-pfp.jpg'></img>
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
