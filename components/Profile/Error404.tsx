import { Session } from "@lib/auth";
import { FC } from 'react';

export const Error404: FC<{session: Session}> = ({session}) => {
  return (
    <>
      <p>{ `This account doesn't exists` }</p>
    </>
  )
};
