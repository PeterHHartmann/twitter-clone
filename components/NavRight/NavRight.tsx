import style from '../../styles/components/NavRight/NavRight.module.scss'
import SearchBar from "./SearchBar"

export default function RightSidebar() {
  return (
    <div className={style.container}>
      <nav>
        <SearchBar />
        <nav>
        <h3>Trends for you</h3>
          <div className="trend">
              <div>
                  <p className="trend-category">Entertainment ⋅ Trending</p>
                  <p className="trend-heading">David Lynch</p>
                  <p className="tweet-count">15.6K Tweets</p>
              </div>
              <svg className="more-svg" viewBox="0 0 24 24"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg>
          </div>
          <div className="trend">
              <div>
                  <p className="trend-category">Politics ⋅ Trending</p>
                  <p className="trend-heading">New York</p>
                  <p className="tweet-count">222K Tweets</p>
              </div>
              <svg className="more-svg" viewBox="0 0 24 24"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg>
          </div>
          <div className="trend">
              <div>
                  <p className="trend-category">Music ⋅ Trending</p>
                  <p className="trend-heading">Kendrick Lamar</p>
                  <p className="tweet-count">23K Tweets</p>
              </div>
              <svg className="more-svg" viewBox="0 0 24 24"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg>
          </div>
          <div className="trend">
              <div>
                  <p className="trend-category">Gaming ⋅ Trending</p>
                  <p className="trend-heading">Xbox</p>
                  <p className="tweet-count">61.8K Tweets</p>
              </div>
              <svg className="more-svg" viewBox="0 0 24 24"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg>
          </div>
        </nav>
        <nav>

        </nav>
      </nav>
    </div>
  );
}
