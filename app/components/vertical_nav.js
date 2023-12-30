import NavHeader from './nav_header'
import NavLinks from './nav_links'

const VerticalNav = ({ isLoggedIn, user }) => {
  return (
    <nav className="vertical-navbar">
      <div className="my-8">
        <NavHeader isLoggedIn={isLoggedIn} user={user} />
      </div>
      <div className="my-8">
        <ul>
          <NavLinks isLoggedIn={isLoggedIn} user={user} />
        </ul>
      </div>
    </nav>
  )
}

export default VerticalNav
