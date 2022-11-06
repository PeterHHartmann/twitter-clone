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
    <div key={index} data-index={index}>
      <button className={style.button} onClick={(e) => handleDeleteClicked(e)}>
        <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 24 24'>
          <g>
            <path d='M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z'></path>
          </g>
        </svg>
      </button>
      <img className={style.img} src={images[index]} />
    </div>
  );
}