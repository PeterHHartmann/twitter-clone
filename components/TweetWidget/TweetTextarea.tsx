import style from '../../styles/components/TweetWidget/TweetTextarea.module.scss';
import { useRef, useState } from 'react';

type Props = {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function TweetTextarea({ value, setValue }: Props) {
  const [rows, setRows] = useState(1);
  const textarea = useRef<HTMLTextAreaElement>(null);

  function handleInput() {
    let val = textarea.current?.value;
    setValue(val);

    const element = textarea.current as HTMLTextAreaElement;
    const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
    const minRows = 1;
    const previousRows = element.rows;
    element.rows = minRows;
    const currentRows = ~~(element.scrollHeight / lineHeight);
    if (currentRows === previousRows) {
      element.rows = currentRows;
    }
    setRows(currentRows);
  }

  return (
    <textarea
      className={style.textarea}
      ref={textarea}
      placeholder="What's happening?"
      rows={rows}
      maxLength={280}
      value={value}
      onInput={handleInput}
    ></textarea>
  );
}
