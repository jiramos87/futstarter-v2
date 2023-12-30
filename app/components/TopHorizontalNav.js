import NavUser from './NavUser'
import HorizontalNavLinks from './HorizontalNavLinks'

const TopHorizontalNav = ({ isLoggedIn, user }) => {
  return (
    <nav className="top-nav">
      <HorizontalNavLinks isLoggedIn={isLoggedIn} user={user} />
      <NavUser isLoggedIn={isLoggedIn} user={user} />
    </nav>
  )
}

export default TopHorizontalNav
