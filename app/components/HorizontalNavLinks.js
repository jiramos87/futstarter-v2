import Link from 'next/link'

import { NAV_RESOURCES } from '../../src/constants/resources'

const HorizontalNavLinks = ({ isLoggedIn, user }) => {
  return (
    <div className="flex gap-4">
      {NAV_RESOURCES.map((link) => {
        const href = isLoggedIn && user ? link.href : '/please-login'

        return (
          <Link
            key={link.name}
            href={href}
            className="horizontal-nav-link"
          >
            <p className="horizontal-nav-link-text">{link.name}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default HorizontalNavLinks
