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
  const [formation, setFormation] = useState('4-4-2')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownPlayers, setDropdownPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [selectedPlayers, setSelectedPlayers] = useState({})
  const [squadName, setSquadName] = useState('')
  const [squadDescription, setSquadDescription] = useState('')
  const [isSquadSaved, setIsSquadSaved] = useState(false)
  const [initialState, setInitialState] = useState({})
  const [squadId, setSquadId] = useState(null)
  const [userSquads, setUserSquads] = useState([])
  const [showLoadSquadDropdown, setShowLoadSquadDropdown] = useState(false)

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

  const hasSquadChanged = () => {
    return (
      JSON.stringify(initialState) !== JSON.stringify({ formation, selectedPlayers, squadName, squadDescription })
    )
  }

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

  const determineFontSize = (name) => {
    if (name.length > 10) {
      return '0.8rem'
    } else {
      return '1rem'
    }
  }

  const handleSaveSquadClick = async () => {
    try {
      const userId = user.id
      const squadData = {
        name: squadName,
        description: squadDescription,
        formation,
        players: selectedPlayers
      }

      const response = await axios.post(`http://localhost:3000/api/users/${userId}/squads`, squadData)
      if (response.data.done && response.data.squad && response.data.squad.squadId) {
        setSquadId(response.data.squad.squadId)
        setIsSquadSaved(true)
        setInitialState({ formation, selectedPlayers, squadName, squadDescription })
      }
    } catch (error) {
      console.error('Error saving squad:', error)
    }
  }

  const handleUpdateSquadClick = async () => {
    try {
      const userId = user.id;
      const squadData = {
        name: squadName,
        description: squadDescription,
        formation,
        players: selectedPlayers,
      };

      if (squadId) {
        await axios.put(`http://localhost:3000/api/users/${userId}/squads/${squadId}`, squadData)
        setIsSquadSaved(true)
        setInitialState({ formation, selectedPlayers, squadName, squadDescription })
      }
    } catch (error) {
      console.error('Error updating squad:', error)
    }
  };

  useEffect(() => {
    if (hasSquadChanged() && squadId) {
      setIsSquadSaved(false)
    }
  }, [formation, selectedPlayers, squadName, squadDescription])

  const handleLoadSquadClick = async () => {
    try {
      const userId = user.id
      const response = await axios.get(`http://localhost:3000/api/users/${userId}/squads`)
      if (response.data && response.data.squads) {
        const filteredSquads = response.data.squads.filter((squad) => squad !== null)
        setUserSquads(filteredSquads)
        setShowLoadSquadDropdown(!showLoadSquadDropdown) // Toggle the display
      }
    } catch (error) {
      console.error('Error loading squads:', error)
    }
  }

  const handleLoadSquad = (squadId) => {
    if (squadId) {
      const selectedSquad = userSquads.find((squad) => squad.id === squadId)
      if (selectedSquad) {
        setSquadId(selectedSquad.id)
        setSquadName(selectedSquad.name)
        setSquadDescription(selectedSquad.description)
        setFormation(selectedSquad.formation)
        setSelectedPlayers(selectedSquad.players || {})
        setInitialState({
          formation: selectedSquad.formation,
          selectedPlayers: selectedSquad.players || {},
          squadName: selectedSquad.name,
          squadDescription: selectedSquad.description
        })
        setShowLoadSquadDropdown(false)
      } else {
        setSquadId(null)
        setSquadName('')
        setSquadDescription('')
        setFormation('4-4-2')
        setSelectedPlayers({})
        setInitialState({})
      }
    }
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {user && (
            <>
              <div className="flex-1 p-4" style={{ height: '50%'}}>
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
              </div>
              <div className="flex-1 p-4 rounded-md" style={{ height: '50%', backgroundColor: '#111457' }}>
                {selectedPlayer && (
                  <div className="flex flex-col items-center text-white mb-2">
                    <ul>
                      <span className="font-bold">Name:</span> {selectedPlayer.name}
                    </ul>
                    <ul>
                      <span className="font-bold">Rating:</span> {selectedPlayer.rating}
                    </ul>
                    <ul>
                      <span className="font-bold">Position:</span> {selectedPlayer.mainPosition}
                    </ul>
                    <ul>
                      <span className="font-bold">Club:</span> {selectedPlayer.club}
                    </ul>
                    <ul>
                      <span className="font-bold">Skill Moves:</span> {selectedPlayer.skillMoves}
                    </ul>
                    <ul>
                      <span className="font-bold">Weak Foot:</span> {selectedPlayer.weakFoot}
                    </ul>
                    <ul>
                      <span className="font-bold">PAC:</span> {selectedPlayer.PAC}
                    </ul>
                    <ul>
                      <span className="font-bold">SHO:</span> {selectedPlayer.SHO}
                    </ul>
                    <ul>
                      <span className="font-bold">PAS:</span> {selectedPlayer.PAS}
                    </ul>
                    <ul>
                      <span className="font-bold">DRI:</span> {selectedPlayer.DRI}
                    </ul>
                    <ul>
                      <span className="font-bold">DEF:</span> {selectedPlayer.DEF}
                    </ul>
                    <ul>
                      <span className="font-bold">PHY:</span> {selectedPlayer.PHY}
                    </ul>
                  </div>
                )}
              </div>
            </>
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
                    top: `calc(${position.position.top} - 3rem)`,
                    left: `calc(${position.position.left} - 2.5rem)`,
                  }}
                  onClick={() => handlePositionSelection(position.name)}
                >
                  <div className="card-container" style={{ width: '5rem', height: '6rem' }}>
                    <button className={"plus-button"}>
                      {selectedPlayers[position.name] ? (
                        <div className="text-black">
                          <p style={{ fontSize: determineFontSize(selectedPlayers[position.name].name) }}>{selectedPlayers[position.name].name}</p>
                          <p className="text-xl">{selectedPlayers[position.name].rating}</p>
                        </div>
                      ) : (
                        <span>+</span>
                      )}
                    </button>
                  </div>
                  <div className="rounded-md bg-gray-800 text-white py-1 px-2 mt-2" style={{ fontSize: '0.75rem' }}>
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
            <>
              <div>
                <button onClick={squadId ? handleUpdateSquadClick : handleSaveSquadClick} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
                  Save Squad
                </button>
                {isSquadSaved && squadId && <span className="text-green-500 ml-2">✔</span>}
                <button
                  onClick={handleLoadSquadClick}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4"
                >
                  Load Squad
                </button>
                {showLoadSquadDropdown && (
                  <div className="dropdown-menu">
                    <select
                      className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white mt-4"
                      onChange={(e) => handleLoadSquad(parseInt(e.target.value))}
                    >
                      <option value="">Select Squad</option>
                      {userSquads.length > 0 ? (
                        userSquads.map((squad) => (
                          <option key={squad.id} value={squad.id}>
                            {squad.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No Squads</option>
                      )}
                    </select>
                  </div>
                )}
                <div className="mt-4">
                  <h1 className="text-xl mb-2">Squad Name</h1>
                  <input
                    type="text"
                    name="squadName"
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white"
                  />
                </div>
                <div className="mt-4">
                  <h1 className="text-xl mb-2">Squad Description</h1>
                  <textarea
                    name="squadDescription"
                    value={squadDescription}
                    onChange={(e) => setSquadDescription(e.target.value)}
                    className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white"
                  />
                </div>
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
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
