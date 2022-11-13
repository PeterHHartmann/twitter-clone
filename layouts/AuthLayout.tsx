import style from '../styles/layouts/AuthLayout.module.scss'
import logo from '../public/icon/logo.svg';
import { PropsWithChildren } from "react";
import Image from "next/image";

export const AuthLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={style.main}>
      <div className={style.container}>
        <Image src={logo} alt='' width={28} height={28} priority={true}/>
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;