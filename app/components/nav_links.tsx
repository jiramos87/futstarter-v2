import Link from 'next/link'

import { NAV_RESOURCES } from '../../src/constants/resources'
import { verticalNavTextStyle } from '../styles/text_styles'

const NavLinks = (): JSX.Element => {
  return (
    <>
      {NAV_RESOURCES.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow justify-center gap-2 rounded-md bg-gradient-to-r from-yellow-400 to-green-400 p-3 text-sm font-medium hover:bg-gradient-to-r hover:from-yellow-300 hover:to-green-300 md:flex-none md:justify-start md:p-2 md:px-3 shadow-md mb-3"
          >
            <p className={`${verticalNavTextStyle} text-yellow-50`}>{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}


export default NavLinks