'use client'

import { useContext } from 'react'

import VerticalNav from '../components/vertical_nav'
import { AuthContext } from '../components/auth/auth_provider'

const MainLayout = ({ children }) => {
  const authContext = useContext(AuthContext)
  const { isLoggedIn, user } = authContext.state

  return (
    <div className="flex min-h-screen">
      <VerticalNav isLoggedIn={isLoggedIn} user={user}  />
      <div className="w-5/6">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
