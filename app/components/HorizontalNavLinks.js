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
            className="flex h-[30px] items-center hover:bg-gray-700 hover:bg-opacity-50 px-3 text-sm font-medium"
          >
            <p className={`text-yellow-50`}>{link.name}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default HorizontalNavLinks
