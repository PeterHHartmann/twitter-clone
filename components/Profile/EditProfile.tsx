import React, { Dispatch, FC, FormEvent, PropsWithChildren, SetStateAction, useRef, useState } from 'react';
import style from '@styles/EditProfile.module.scss';
import { Session } from '@lib/auth';
import Image from 'next/image';
import defaultPfp from '@image/default-pfp.jpg';
import closeIcon from '@icon/remove.svg';
import addImageIcon from '@icon/add-image.svg';
import { FormInput } from "@components/Auth/FormInput";
import { useRouter } from "next/router";

type Props = {
  csrfToken: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  session: Session;
  data: {
    displayname: string;
    bio: string;
    location: string;
    banner: string;
    avatar: string;
  };
};

export const EditProfile: FC<PropsWithChildren<Props>> = ({ csrfToken, setIsOpen, session, data }) => {
  const { reload } = useRouter();
  const [displayname, setDisplayName] = useState<string>(data.displayname || '');
  const [bio, setBio] = useState<string>(data.bio || '');
  const [location, setLocation] = useState<string>(data.location || '');
  const [bannerSrc, setBannerSrc] = useState<string>(data.banner ? `http://127.0.0.1:8000${data.banner}` : '');
  const [avatarSrc, setAvatarSrc] = useState<string>(data.avatar ? `http://127.0.0.1:8000${data.avatar}` : '');
  const [serverError, setServerError] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('form submitted');
    try {
      const formData = new FormData()
      formData.append('displayname', displayname)
      formData.append('bio', bio)
      formData.append('location', location)
      const currentBanner = bannerInputRef.current;
      if (currentBanner && currentBanner.files && currentBanner.files[0]) {
        formData.append('banner', currentBanner.files[0]);
      }
      const currentAvatar = avatarInputRef.current;
      if (currentAvatar && currentAvatar.files && currentAvatar.files[0]) {
        formData.append('avatar', currentAvatar.files[0]);
      }
      const response = await fetch(`/api/profile/edit/${session.username}`, {
        method: 'post',
        headers: {
          'x-csrf-token': csrfToken
        },
        body: formData
      })
      if (response.ok) {
        reload();
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
  }

  const handleAvatarUpload = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const src = URL.createObjectURL(file);
      setAvatarSrc(src);
    }
  }

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
              {bannerSrc ? <img src={bannerSrc} alt='' /> : null}
              <label className={style.fileLabel} htmlFor='banner'>
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
                {avatarSrc ? (
                  <img src={avatarSrc} alt='' />
                ) : (
                  <Image src={defaultPfp} alt='User Avatar' width={120} height={120} priority={true} />
                )}
                <label className={style.fileLabel} htmlFor='avatar'>
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
