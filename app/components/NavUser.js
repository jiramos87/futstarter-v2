import LoggedInNav from './logged_in_nav'
import LoggedOutNav from './logged_out_nav'

const NavUser = ({ context }) => {
  const { isLoggedIn, user } = context.state
  return (
    <div>
      {isLoggedIn && user ? <LoggedInNav context={context} /> : <LoggedOutNav context={context} />}
    </div>
  )
}

export default NavUser
