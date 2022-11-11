import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from "next-auth";

type MyAppProps = AppProps & {
  session: Session;
};

export default function App({ Component, pageProps, session}: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}