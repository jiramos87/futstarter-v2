'use client'

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'

import { AuthContext } from '../components/auth/auth_provider'
import MainLayout from '../layouts/main_layout'

const SignUpUserPage = () => {
  const router = useRouter()
  const { signup, setError } = useContext(AuthContext).actions
  const { error } = useContext(AuthContext).state

  const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e, field) => {
    const { value } = e.target
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { userName, email, password } = formValues

      await signup({ userName, email, password })
      router.push('/squad-builder')
    } catch (e) {
      setError(error)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Signup User</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            value={formValues.userName}
            onChange={(e) => handleInputChange(e, 'userName')}
            className="border border-gray-300 rounded-md p-2 m-2"
            style={{ color: 'black' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formValues.email}
            onChange={(e) => handleInputChange(e, 'email')}
            className="border border-gray-300 rounded-md p-2 m-2"
            style={{ color: 'black' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={formValues.password}
            onChange={(e) => handleInputChange(e, 'password')}
            className="border border-gray-300 rounded-md p-2 m-2"
            style={{ color: 'black' }}
          />
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 m-2">
            Sign Up
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </MainLayout>
  )
}

export default SignUpUserPage
