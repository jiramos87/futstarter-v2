'use client'

import { useContext, useState } from 'react'
import Router from 'next/router'

import MainLayout from '../layouts/main_layout'
import { AuthContext } from '../components/auth/auth_provider'

const LoginUserPage = () => {
  const { login, setIsLoggedIn } = useContext(AuthContext).actions

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
      await login(credentials)
      setIsLoggedIn(true)
      Router.push('/')
    } catch (e) {
      setError(error)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Login User</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 m-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 m-2"
          />
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 m-2">
            Login
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </MainLayout>
  )
}

export default LoginUserPage