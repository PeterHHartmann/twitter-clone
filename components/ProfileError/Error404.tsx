import { Session } from "@/lib/auth";
import { FC } from 'react';
import { Header } from "../Header";

export const Error404: FC<{session: Session}> = ({session}) => {
  return (
    <>
      <Header name="Profile" href={`/${session.username}`}/>
      <p>{ `This account doesn't exists` }</p>
    </>
  )
};
