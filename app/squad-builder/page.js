'use client'

import { useEffect, useState } from 'react'

import MainLayout from '../layouts/main_layout'
import { getLoginSessionFromDocumentToken, getTokenFromDocumentCookie } from '../../lib/client-cookies'

const SquadBuilderPage = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = getTokenFromDocumentCookie()
        const session = await getLoginSessionFromDocumentToken(token)

        if (session) {
          setUser(session)
        }
      } catch (error) {
        console.error(error)
        setError(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Squad Builder</h1>
        {user && (
          <>
            <p>Your session:</p>
            <pre style={{ maxWidth: '100%', overflow: 'auto' }}>
              {/* display user data */}
              {JSON.stringify(user, null, 2)}
            </pre>
          </>
        )}
        {error && (
          <>
            <p>Error:</p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
