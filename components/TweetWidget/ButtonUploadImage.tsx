import style from '@/styles/components/TweetWidget/ButtonUploadImage.module.scss';
import icon from '@/public/icon/photo.svg'
import Image from "next/image";
import React, { FC } from "react";

type ButtonProps =  {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export const ButtonUploadImage: FC<ButtonProps>= ({images, setImages}) => {

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
        <Image src={icon} alt='' width={21} height={21} priority={true}/>
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