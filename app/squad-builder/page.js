'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import MainLayout from '../layouts/main_layout'
import { getLoginSessionFromDocumentToken, getTokenFromDocumentCookie } from '../../lib/client-cookies'
import { SQUAD_FORMATIONS_POSITIONS } from '../../src/constants/formations'

const SquadBuilderPage = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [playerSearchString, setPlayerSearchString] = useState('')
  const [playerItems, setPlayerItems] = useState([])
  const [formation, setFormation] = useState('4-4-2')

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

  const handlePlayerSearchChange = async (e) => {
    const inputPlayerName = e.target.value
    setPlayerSearchString(inputPlayerName)
    try {
      const response = await axios.get(`http://localhost:3000/api/players/search?name=${playerSearchString}`)
      setPlayerItems(response.data.playerItems)
    } catch (error) {
      console.error('search axios error', error)
      setPlayerItems([])
    }
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {user && (
            <div className="mb-4">
              <h1 className="text-xl mb-2">Welcome {user.userName}</h1>
              <input
                type="text"
                name="playerName"
                value={playerSearchString}
                onChange={handlePlayerSearchChange}
                placeholder="Search Player"
                className="border border-gray-700 rounded-md px-3 py-2 w-full mb-2 bg-gray-800 text-white"
              />
              <ul>
                {playerItems.map((player) => (
                  <li key={player.id}>
                    <p className="text-sm">
                      {player.name} - {player.rating}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!user && (
            <div>
              <h1 className="text-5xl">Welcome to Futstarter ⚽</h1>
              <h2 className="text-3xl">Please login to continue</h2>
            </div>
          )}
        </div>
        <div className="flex-2 bg-blue-900 relative" style={{ flexBasis: '50%' }}>
          <div
            className="bg-center bg-no-repeat bg-contain h-full"
            style={{ backgroundImage: `url('/football-pitch.jpg')` }}
          >
            {user && (
              <>
                {SQUAD_FORMATIONS_POSITIONS[formation].map((player, index) => (
                  <div
                    key={index}
                    className="absolute text-white"
                    style={{
                      top: `calc(${player.position.top} - 2rem)`, // Adjust based on the size of the player div
                      left: `calc(${player.position.left} - 2rem)`, // Adjust based on the size of the player div
                      fontSize: '1.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '4rem', // Width of the player div
                      height: '4rem', // Height of the player div
                      borderRadius: '50%', // Ensure the div is circular for players
                      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Example background color for players
                    }}
                  >
                    {player.name}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {user && (
            <div>
              <h1 className="text-xl mb-2">Formation</h1>
              <select
                name="formation"
                value={formation}
                onChange={(e) => setFormation(e.target.value)}
                className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white"
              >
                {Object.keys(SQUAD_FORMATIONS_POSITIONS).map((formation) => (
                  <option key={formation} value={formation}>
                    {formation}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SquadBuilderPage
