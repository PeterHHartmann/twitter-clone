import React, { Dispatch, FC, FormEvent, PropsWithChildren, SetStateAction, useRef, useState } from 'react';
import style from '@styles/pages/profile/EditProfile.module.scss';
import { Session } from '@lib/auth';
import Image from 'next/image';
import closeIcon from '@icon/remove-light.svg';
import addImageIcon from '@icon/add-image.svg';
import { FormInput } from '@components/form/FormInput';
import { useRouter } from 'next/router';
import { AvatarEditable } from './user/AvatarEditable';
import { BannerEditable } from './user/BannerEditable';
import { ProfileInfo } from 'pages/[profile]';

type Props = {
    csrfToken: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    session: Session;
    profileInfo: ProfileInfo;
    setProfileInfo: Dispatch<SetStateAction<ProfileInfo>>;
};

export const EditProfile: FC<PropsWithChildren<Props>> = ({
    csrfToken,
    setIsOpen,
    session,
    profileInfo,
    setProfileInfo,
}) => {
    const { reload } = useRouter();
    const [displayname, setDisplayName] = useState<string>(profileInfo.displayname || '');
    const [bio, setBio] = useState<string>(profileInfo.bio || '');
    const [location, setLocation] = useState<string>(profileInfo.location || '');
    const [bannerSrc, setBannerSrc] = useState<string | undefined>(profileInfo.banner);
    const [avatarSrc, setAvatarSrc] = useState<string | undefined>(profileInfo.avatar);
    const [serverError, setServerError] = useState<string | null>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('form submitted');
        try {
            const formData = new FormData();
            formData.append('displayname', displayname);
            formData.append('bio', bio);
            formData.append('location', location);
            const currentBanner = bannerInputRef.current;
            if (currentBanner && currentBanner.files && currentBanner.files[0]) {
                formData.append('banner', currentBanner.files[0]);
            }
            const currentAvatar = avatarInputRef.current;
            if (currentAvatar && currentAvatar.files && currentAvatar.files[0]) {
                formData.append('avatar', currentAvatar.files[0]);
            }
            const response = await fetch(`/api/profile/${session.username}`, {
                method: 'post',
                headers: {
                    'x-csrf-token': csrfToken,
                },
                body: formData,
            });
            if (response.ok) {
                if (avatarSrc === profileInfo.avatar || bannerSrc === profileInfo.banner) {
                    const profileChanges = profileInfo;
                    profileChanges.displayname = displayname;
                    profileChanges.bio = bio;
                    profileChanges.location = location;
                    setProfileInfo(profileChanges);
                    setIsOpen(false);
                } else {
                    reload();
                }
            } else {
                const { error } = await response.json();
                setServerError(error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseClicked = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsOpen(false);
    };

    const handleBannerUpload = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            const src = URL.createObjectURL(file);
            setBannerSrc(src);
        }
    };

    const handleAvatarUpload = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            const src = URL.createObjectURL(file);
            setAvatarSrc(src);
        }
    };

    return (
        <div className={style.modal}>
            <form action='post' className={style.form} onSubmit={handleSubmit}>
                <input type='hidden' id='csrfToken' name='csrfToken' defaultValue={csrfToken} />
                <div>
                    <div className={style.top}>
                        <div>
                            <button className={style.closeBtn} name='close' onClick={handleCloseClicked}>
                                <Image src={closeIcon} alt='' width={20} height={20} priority={false}></Image>
                            </button>
                            <h1>Edit Profile</h1>
                        </div>
                        <button className={style.saveBtn}>Save</button>
                    </div>
                    <div>
                        <div className={style.banner}>
                            <BannerEditable src={bannerSrc} />
                            <label className={style.addImageBtn} htmlFor='banner'>
                                <Image src={addImageIcon} alt='' width={24} height={24} priority={true} />
                                <input
                                    id='banner'
                                    name='banner'
                                    className={style.fileInput}
                                    type='file'
                                    accept='image/jpeg,image/png,image/webp'
                                    onChange={handleBannerUpload}
                                    ref={bannerInputRef}
                                />
                            </label>
                        </div>
                        <div className={style.avatarContainer}>
                            <div className={style.avatar}>
                                <AvatarEditable src={avatarSrc} width={120} height={120} />
                                {/* <Image src={avatarSrc ? avatarSrc : avatarDefault} alt='' width={120} height={120} priority={true} /> */}
                                <label className={style.addImageBtn} htmlFor='avatar'>
                                    <Image src={addImageIcon} alt='' width={24} height={24} priority={true} />
                                    <input
                                        id='avatar'
                                        name='avatar'
                                        className={style.fileInput}
                                        type='file'
                                        accept='image/jpeg,image/png,image/webp'
                                        onChange={handleAvatarUpload}
                                        ref={avatarInputRef}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <FormInput name='name' type='text' value={displayname} setValue={setDisplayName} serverError={serverError} />
                    <FormInput name='bio' type='text' value={bio} setValue={setBio} serverError={serverError} />
                    <FormInput name='location' type='text' value={location} setValue={setLocation} serverError={serverError} />
                </div>
            </form>
        </div>
    );
};
