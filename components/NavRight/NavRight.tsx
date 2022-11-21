import style from '@styles/components/NavRight/NavRight.module.scss'
import FollowNav from "./FollowNav";
import SearchBar from "./SearchBar"
import TrendsNav from "./TrendsNav"

export const RightSidebar: React.FC = () => {
  return (
    <div className={style.container}>
      <div>
        <SearchBar />
        <TrendsNav />
        <FollowNav />
      </div>
    </div>
  );
}

export default RightSidebar