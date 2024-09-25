import style from '@styles/pages/home/ButtonUploadImage.module.scss';
import icon from '@icon/photo.svg';
import Image from 'next/image';
import React, { FC } from 'react';

type ButtonProps = {
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    imageFiles: File[];
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export const ButtonUploadImage: FC<ButtonProps> = ({ imageUrls, setImageUrls, imageFiles, setImageFiles }) => {
    function handleImageUpload(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const i = target.files[0];
            const src = URL.createObjectURL(i);
            if (imageUrls.length < 4) {
                setImageUrls(imageUrls.concat(src));
                setImageFiles(imageFiles.concat(i));
                target.value = '';
            }
        }
    }

    return (
        <div className={style.container}>
            <label className={style.label} htmlFor='upload-tweet-img'>
                <Image src={icon} alt='' width={21} height={21} priority={true} />
                <input
                    className={style.input}
                    type='file'
                    accept='image/jpeg,image/png,image/webp,image/gif'
                    id='upload-tweet-img'
                    onChange={(e) => handleImageUpload(e)}
                />
            </label>
        </div>
    );
};
