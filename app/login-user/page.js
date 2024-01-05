'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import MainLayout from '../layouts/main_layout'
import { AuthContext } from '../components/auth/auth_provider'

const LoginUserPage = () => {
  const { isLoggedIn } = useContext(AuthContext).state
  const { login, setIsLoggedIn } = useContext(AuthContext).actions
  const router = useRouter()

  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (error) setError('')

    try {
      const user = await login(credentials)
      if (user) {
        setIsLoggedIn(true)
        router.push('/squad-builder')
      } else {
        setIsLoggedIn(false)
        setError('Login failed')     
      }
    } catch (e) {
      setIsLoggedIn(false)
      setError(error)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {!isLoggedIn && (
        <div>
          <h1 className="text-6xl font-bold">Login User</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 m-2"
              style={{ color: 'black' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 m-2"
              style={{ color: 'black' }}
            />
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
        )}
      </div>
    </MainLayout>
  )
}

export default LoginUserPage