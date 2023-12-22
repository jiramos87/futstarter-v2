import NavUser from './NavUser'
import HorizontalNavLinks from './HorizontalNavLinks'

const TopHorizontalNav = ({ isLoggedIn, user }) => {
  return (
    <nav className="bg-blue-900 w-full p-0 flex justify-between items-center align-center" style={{ backgroundColor: '#4d88ff' }}>
      <HorizontalNavLinks isLoggedIn={isLoggedIn} user={user} />
      <NavUser isLoggedIn={isLoggedIn} user={user} />
    </nav>
  )
}

export default TopHorizontalNav
