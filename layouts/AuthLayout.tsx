import style from '@/styles/layouts/AuthLayout.module.scss'
import logo from '@/public/icon/logo.svg';
import { FC, PropsWithChildren } from "react";
import Image from "next/image";

export const AuthLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={style.main}>
      <div className={style.container}>
        <Image src={logo} alt='' width={32} height={32} />
        {children}
      </div>
    </main>
  );
}