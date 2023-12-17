'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

import MainLayout from '../layouts/main_layout'
import { getLoginSessionFromDocumentToken, getTokenFromDocumentCookie } from '../../lib/client-cookies'
import { SQUAD_FORMATIONS_POSITIONS } from '../../src/constants/formations'
import { PlayerDropdown } from '../components/player_dropdown'

const SquadBuilderPage = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [playerSearchString, setPlayerSearchString] = useState('')
  const [formation, setFormation] = useState('4-4-2')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownPlayers, setDropdownPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [selectedPlayers, setSelectedPlayers] = useState({})

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
    setShowDropdown(true)
    try {
      const response = await axios.get(`http://localhost:3000/api/players/search?name=${playerSearchString}`)
      setDropdownPlayers(response.data.playerItems)
    } catch (error) {
      console.error('search axios error', error)
      setDropdownPlayers([])
    }
  }

  const handlePositionSelection = (position) => {
    setSelectedPosition(position)
    if (!selectedPlayers[position]) {
      setSelectedPlayer(null)
    } else {
      setSelectedPlayer(selectedPlayers[position])
    }
  }

  const handleDropdownItemClick = (player) => {
    const updatedSelectedPlayers = { ...selectedPlayers, [selectedPosition]: player }
    setSelectedPlayers(updatedSelectedPlayers)
    setSelectedPlayer(player)
    setShowDropdown(false)
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {user && (
            <div className="mb-4">
              <h1 className="text-xl mb-2">Welcome {user.userName}</h1>
              <div className="bg-gray-800 text-white rounded-md p-2 mt-4">
                Selected Position: {selectedPosition}
              </div>
              <input
                type="text"
                name="playerName"
                value={playerSearchString}
                onChange={handlePlayerSearchChange}
                placeholder="Search Player"
                className="border border-gray-700 rounded-md px-3 py-2 w-full mb-2 bg-gray-800 text-white"
              />
             <ul className="dropdown-list">
              {showDropdown &&
                dropdownPlayers.map((player, index) => (
                  <li key={index} className="dropdown-item">
                    <button
                      onClick={() => handleDropdownItemClick(player)}
                      className="dropdown-item-button"
                    >
                      {player.name} - {player.rating}
                    </button>
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
                {SQUAD_FORMATIONS_POSITIONS[formation].map((position, index) => (
                  <div
                    key={index}
                    className="absolute text-white flex flex-col items-center"
                    style={{
                      top: `calc(${position.position.top} - 2rem)`,
                      left: `calc(${position.position.left} - 2rem)`,
                    }}
                  >
                    <button
                      onClick={() => handlePositionSelection(position.name)}
                      className="bg-transparent border-none text-white cursor-pointer"
                      style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {selectedPlayers[position.name] ? (
                        <div className="text-white text-xl">
                          <p>{selectedPlayers[position.name].name}</p>
                          <p>{selectedPlayers[position.name].rating}</p>
                        </div>
                      ) : (
                        <span>+</span>
                      )}
                    </button>
                    <div
                      className="rounded-md bg-gray-800 text-white py-1 px-2 mt-2"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {position.name}
                    </div>
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
  )
}

export default SquadBuilderPage
