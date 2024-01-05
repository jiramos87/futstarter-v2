'use client'

import LoggedInNav from './logged_in_nav'
import LoggedOutNav from './logged_out_nav'

const NavHeader = ({ isLoggedIn, user }) => {
  return (
    (isLoggedIn && user) ? <LoggedInNav /> : <LoggedOutNav />
  )
}

export default NavHeader
