'use client'

import { useContext } from 'react'

import { AuthContext } from '../components/auth/auth_provider'
import TopHorizontalNav from '../components/TopHorizontalNav'

const MainLayout = ({ children }) => {
  const authContext = useContext(AuthContext)
  const { isLoggedIn, user } = authContext.state

  return (
    <div className="flex flex-col h-screen">
      <TopHorizontalNav isLoggedIn={isLoggedIn} user={user} /> {/* Render the new top navigation */}
      <div className="flex flex-1">
        <div className="main-style">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
