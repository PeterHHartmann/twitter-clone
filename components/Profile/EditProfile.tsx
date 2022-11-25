import { Dispatch, FC, FormEvent, PropsWithChildren, SetStateAction, useState } from 'react';
import style from '@styles/EditProfile.module.scss';
import { Session } from '@lib/auth';
import Image from 'next/image';
import defaultPfp from '@image/default-pfp.jpg';
import closeIcon from '@icon/remove.svg';
import addImageIcon from '@icon/add-image.svg';
import { FormInput } from "@components/Auth/FormInput";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  session: Session;
  data: {
    displayname: string;
    bio: string;
    banner: string;
    location: string;
  };
};

export const EditProfile: FC<PropsWithChildren<Props>> = ({ setIsOpen, session, data }) => {
  const [displayname, setDisplayName] = useState<string>(data.displayname);
  const [bio, setBio] = useState<string>(data.bio);
  const [location, setLocation] = useState<string>(data.location);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('form submitted');
  };

  const handleCloseClicked = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <div className={style.modal}>
      <form action='post' className={style.form} onSubmit={handleSubmit}>
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
              {data.banner ? <Image src={data.banner} alt='' /> : null}
              <button className={style.addImageBtn}>
                <Image src={addImageIcon} alt='set banner' width={24} height={24} />
              </button>
            </div>
            <div className={style.avatarContainer}>
              <div className={style.avatar}>
                <Image src={defaultPfp} alt='User Avatar' width={120} height={120} />
                <button className={style.addImageBtn}>
                  <Image src={addImageIcon} alt='set banner' width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
          <FormInput name="name" type="text" value={displayname} setValue={setDisplayName} serverError={serverError}/>
          <FormInput name="bio" type="text" value={bio} setValue={setBio} serverError={serverError}/>
          <FormInput name="location" type="text" value={location} setValue={setLocation} serverError={serverError}/>
        </div>
      </form>
    </div>
  );
};
