import style from '@styles/layouts/header/UserWidget.module.scss';
import { FC, useState } from 'react';
import Image from 'next/image';
import icon from '@icon/more.svg';
import { useRouter } from 'next/router';
import { Session } from '@lib/auth/session';
import { Avatar } from '@components/user/Avatar';

export const UserWidget: FC<{ session: Session; }> = ({ session }) => {
    const [displayLogout, setDisplayLogout] = useState(false);
    const { reload } = useRouter();

    const handleClick = () => {
        setDisplayLogout(!displayLogout);
    };

    const signOut = async () => {
        const response = await fetch('/api/auth/signout', {
            method: 'post',
        });
        if (response.ok) reload();
    };

    return (
        <div className={displayLogout ? style.open : style.closed}>
            {displayLogout && (
                <div className={style.logout}>
                    <button onClick={signOut}>Sign out</button>
                </div>
            )}
            <div className={style.user} onClick={handleClick}>
                <div className={style.avatar}>
                    <Avatar src={session.avatar} width={48} height={48} />
                </div>
                <div className={style.info}>
                    <div className={style.displayname}>{session.displayname}</div>
                    <div className={style.username}>{session.username}</div>
                </div>
                <Image className={style.more} src={icon} alt='' width={19} height={19} priority={false} />
            </div>
        </div>
    );
};
