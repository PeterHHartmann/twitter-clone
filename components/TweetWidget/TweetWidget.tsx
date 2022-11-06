import style from '../../styles/components/TweetWidget/Widget.module.scss';
import ButtonUploadImage from './ButtonUploadImage'
import RemovableImage from "./RemovableImage";
import React, { useState } from 'react';

export default function TweetWidget() {
  const [images, setImages] = useState<string[]>([]);
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <section className={style.section}>
      <img className={style.profile} src='/img/default-pfp.jpg'></img>
      <form className={style.form} action='POST' onSubmit={handleSubmit}>
        <textarea placeholder="What's happening?" rows={1} maxLength={280}></textarea>
        <div className={style.imgsContainer}>
          {images.map((_, index) => (
            <RemovableImage images={images} setImages={setImages} index={index}/>
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
