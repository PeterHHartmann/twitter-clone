import style from '../styles/components/Header.module.scss';

type HeaderProps = {
  name: string;
  href: string;
  icon?: string;
  alt?: string;
};

export default function Header({ name, href, icon, alt }: HeaderProps) {
  return (
    <header className={style.container}>
      <a className={style.link} href={href}>
        {name}
      </a>
      <svg className={style.icon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <use href={"/icons.svg#" + icon}></use>
      </svg>
    </header>
  );
}
