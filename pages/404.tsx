import Head from "next/head";
import { FC } from "react";

export const E404: FC = () => {
  return (
    <>
      <Head>
        <title>{`Page Not Found / Twitter`}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <h1>404 - Page Not Found</h1>
    </>
  );
}

export default E404;