import { getExternalApiUrl } from '@lib/config';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
    src: string | undefined;
};

export const Banner: FC<Props> = ({ src }) => {
    if (!src) return null;
    try {
        return (
            <Image
                src={getExternalApiUrl() + src}
                alt=''
                fill={true}
                sizes='(max-width: 1024px) 35vw, (max-width: 1920px) 35vw'
                priority={true}
            />
        );
    } catch (err) {
        console.log(err);
        return null;
    }
};
