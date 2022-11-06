type Props = {
  page: string;
};

export default function LeftSidebar({ page }: Props) {
  return (
    <div className='left-side'>
      <nav>
        <div className='nav-links'>
          <a href='/' className='logo'>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#logo'></use>
            </svg>
          </a>
          <a href='/' className='home'>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#home'></use>
            </svg>
            <p>Home</p>
          </a>
          <a href='/' className='nav-link hoverable'>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#hashtag'></use>
            </svg>
            <p>Explore</p>
          </a>
          <a href='/' className='nav-link hoverable'>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#bell'></use>
            </svg>
            <p>Notifications</p>
          </a>
          <a href='/' className='nav-link hoverable'>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#mail'></use>
            </svg>
            <p>Messages</p>
          </a>
          <a href='/' className='nav-link hoverable'>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#list'></use>
            </svg>
            <p>Bookmarks</p>
          </a>
          <a href='/' className=''>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#profile'></use>
            </svg>
            <p>Profile</p>
          </a>
          <a href='/' className='nav-link hoverable'>
            <svg viewBox='0 0 24 24'>
              <use href='/icons.svg#misc'></use>
            </svg>
            <p>More</p>
          </a>
        </div>
      </nav>
    </div>
  );
}
