import React from "react";
import style from '../../styles/components/TweetWidget/ButtonUploadImage.module.scss';

type Props =  {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ButtonUploadImage({images, setImages} : Props){

  function handleImageUpload(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const i = target.files[0];
      const src = URL.createObjectURL(i);
      if (images.length < 4) {
        setImages(images.concat(src));
        target.value = '';
      }
    }
  }

  return (
    <div className={style.container}>
      <label className={style.label} htmlFor='upload-tweet-img'>
        <svg className={style.icon} viewBox='0 0 24 24'>
          <use href="/icons.svg#photo"></use>
        </svg>
        <input className={style.input}
          type='file'
          accept='image/jpeg,image/png,image/webp,image/gif'
          id='upload-tweet-img'
          onChange={(e) => handleImageUpload(e)}
        />
      </label>
    </div>
  );
}