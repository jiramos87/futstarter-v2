'use client'

import Link from 'next/link'

import { useState } from 'react'
import { LOGIN_USER } from '../../src/constants/resources'
import { verticalNavTextStyle } from '../styles/text_styles'

const NavHeader = (): JSX.Element => {
  return (
    <Link
      key={LOGIN_USER.name}
      href={LOGIN_USER.href}
      className="flex h-[48px] grow justify-center gap-2 rounded-md bg-gradient-to-r from-yellow-400 to-green-400 p-3 text-sm font-medium hover:bg-gradient-to-r hover:from-yellow-300 hover:to-green-300 md:flex-none md:justify-start md:p-2 md:px-3 shadow-md mb-3"
    >
      <p className={`${verticalNavTextStyle} text-yellow-50`}>{LOGIN_USER.name}</p>
    </Link>
  )
}

export default NavHeader