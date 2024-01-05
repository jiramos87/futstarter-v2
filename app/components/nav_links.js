import Link from 'next/link'

import { NAV_RESOURCES } from '../../src/constants/resources'

const NavLinks = ({ isLoggedIn, user }) => {
  return (
    <>
      {NAV_RESOURCES.map((link) => {
        const href = isLoggedIn && user ? link.href : '/please-login'

        return (
          <Link
            key={link.name}
            href={href}
            className="vertical-nav-link"
          >
            <p className="top-nav-text">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}


export default NavLinks