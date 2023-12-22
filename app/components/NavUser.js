import LoggedInNav from './logged_in_nav'
import LoggedOutNav from './logged_out_nav'

const NavUser = ({ isLoggedIn, user }) => {
  return (
    <div>
      {isLoggedIn && user ? <LoggedInNav /> : <LoggedOutNav />}
    </div>
  )
}

export default NavUser
