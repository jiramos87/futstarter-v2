'use client'

import { AuthProvider } from './components/auth/auth_provider'

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default Providers
