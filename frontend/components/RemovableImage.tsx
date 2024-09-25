import Image from 'next/image';
import style from '@styles/pages/home/RemovableImage.module.scss';
import icon from '@icon/remove-light.svg';
import { FC } from 'react';
import { getExternalApiUrl } from '@lib/config';

type RemovableImageProps = {
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    imageFiles: File[];
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
    index: number;
};

export const RemovableImage: FC<RemovableImageProps> = ({
    imageUrls,
    setImageUrls,
    imageFiles,
    setImageFiles,
    index,
}) => {
    function handleDeleteClicked(e: React.MouseEvent) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const parent = target.parentElement;
        const index = Number(parent?.dataset.index);
        setImageUrls(imageUrls.filter((_, i) => i !== index));
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    }

    return (
        <div data-index={index}>
            <button className={style.button} onClick={(e) => handleDeleteClicked(e)}>
                <Image src={icon} alt='' width={19} height={19} priority={true}></Image>
            </button>
            <Image
                className={style.img}
                src={imageUrls[index].includes('blob') ? imageUrls[index] : getExternalApiUrl() + imageUrls[index]}
                alt=''
                width={100}
                height={100}
                priority={true}
            />
        </div>
    );
};
