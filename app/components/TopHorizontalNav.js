import NavUser from './NavUser'
import HorizontalNavLinks from './HorizontalNavLinks'

const TopHorizontalNav = ({ context }) => {
  const { isLoggedIn, user } = context.state
  return (
    <nav className="top-nav">
      <HorizontalNavLinks isLoggedIn={isLoggedIn} user={user} />
      <NavUser context={context} />
    </nav>
  )
}

export default TopHorizontalNav
