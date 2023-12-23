'use client'

import React, { createContext, useState } from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'

export const AuthContext = createContext(
  {
    state: { isLoggedIn: false, user: null, error: '' },
    actions: {
      login: () => { },
      logout: () => { },
      signup: () => { },
      getUser: () => { },
      setError: () => { },
      setIsLoggedIn: () => { }
    }
  }
)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/user')
      setUser(response.data.user)
      return response.data.user
    } catch (error) {
      setUser(null)
      return null
    }
  }

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login-user', credentials)

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        setIsLoggedIn(true)
        setError('')
        const user = await getUser()

        return user
      } else {
        setIsLoggedIn(false)
        return null
      }
    } catch (error) {
      setIsLoggedIn(false)
      setError(error.response.data.message || 'Login failed')
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
    } catch (error) {
      setIsLoggedIn(false)
    }
  }

  const signup = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup-user', credentials)

      if (response.status === 200 ) {
        setIsLoggedIn(true)
        setError('')
        setUser(response.data.user)
        await login(credentials)
      }
      
    } catch (error) {
      setError(error.response.data.message)
      setIsLoggedIn(false)
    }
  }

  const value = {
    state: { isLoggedIn, user, error },
    actions: { login, logout, signup, getUser, setError, setIsLoggedIn }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
