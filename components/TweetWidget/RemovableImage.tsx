import Image from 'next/image';
import style from '../../styles/components/TweetWidget/RemovableImage.module.scss'

type Props = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  index: number
};

export default function RemovableImage({ images, setImages, index }: Props) {

  function handleDeleteClicked(e: React.MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const parent = target.parentElement;
    const index = Number(parent?.dataset.index);
    setImages(images.filter((image) => images.indexOf(image) !== index));
  }

  return (
    <div data-index={index}>
      <button className={style.button} onClick={(e) => handleDeleteClicked(e)}>
        <svg>
          <use href="/icons.svg#remove"></use>
        </svg>
      </button>
      <Image className={style.img} src={images[index]} alt='' width={100} height={100}/>
    </div>
  );
}