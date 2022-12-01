import style from '@styles/components/NavRight/NavRight.module.scss'
import { FollowNav } from '@components/NavRight/FollowNav';
import { SearchBar } from '@components/NavRight/SearchBar';
import { TrendsNav } from '@components/NavRight/TrendsNav';
import { FC } from "react";

export const NavRight: FC = () => {
  return (
    <div className={style.container}>
      <div>
        <SearchBar />
        <TrendsNav />
        <FollowNav />
      </div>
    </div>
  );
};
