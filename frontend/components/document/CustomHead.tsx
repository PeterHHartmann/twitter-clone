import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import favicon from '@public/favicon.ico';

type Props = PropsWithChildren & {
    title: string;
};

export const CustomHead: FC<Props> = ({ children, title }) => {
    return (
        <Head>
            {children}
            <title>{title}</title>
            <meta
                name='viewport'
                content='initial-scale=1.0, width=device-width, maximum-scale=1, user-scalable=0, viewport-fit=cover'
            />
            <link rel='shortcut icon' href={favicon.src} type='image/x-icon' />
        </Head>
    );
};
