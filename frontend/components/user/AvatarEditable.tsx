import Image from 'next/image';
import { FC } from 'react';
import avatarDefault from '@image/default-avatar.jpg';
import { getExternalApiUrl } from '@lib/config';

type Props = {
    src: string | undefined;
    width: number;
    height: number;
};

export const AvatarEditable: FC<Props> = ({ src, width, height }) => {
    if (!src) return <Image src={avatarDefault} alt='' width={width} height={height} priority={true} />;
    try {
        return (
            <Image
                src={src.includes('blob') ? src : getExternalApiUrl() + src}
                alt=''
                width={width}
                height={height}
                priority={true}
            />
        );
    } catch (err) {
        return <Image src={avatarDefault} alt='' width={width} height={height} priority={true} />;
    }
};
