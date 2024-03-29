import Image from 'next/image';
import style from '../../styles/components/TweetWidget/RemovableImage.module.scss'
import icon from '../../public/icon/remove.svg'

type RemovableImageProps = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  index: number
};

export const RemovableImage: React.FC<RemovableImageProps> = ({ images, setImages, index }) => {

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
        <Image src={icon} alt='' width={19} height={19} priority={true}></Image>
      </button>
      <Image className={style.img} src={images[index]} alt='' width={100} height={100}/>
    </div>
  );
}

export default RemovableImage