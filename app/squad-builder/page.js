'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaLightbulb } from 'react-icons/fa'

import MainLayout from '../layouts/main_layout'
import { getLoginSessionFromDocumentToken, getTokenFromDocumentCookie } from '../../lib/client-cookies'
import { SQUAD_FORMATIONS_POSITIONS } from '../../src/constants/formations'
import { RadarChart } from '../components/radar_chart'
import { parseHeight } from '../../src/utils/string_util'

const getProcessedWorkRate = (workRates, playerCount) => {
  let integerWorkRateTotal = 0
  for (let workRate of workRates) {
    if (workRate === 'H') {
      integerWorkRateTotal += 3
    }
    if (workRate === 'M') {
      integerWorkRateTotal += 2
    }
    if (workRate === 'L') {
      integerWorkRateTotal += 1
    }
  }

  return parseFloat(integerWorkRateTotal / playerCount).toFixed(1)
}

const getInitialSquadAttributes = () => ({
  clubs: {},
  leagues: {},
  nations: {},
  generalAttWorkRate: [],
  generalDefWorkRate: [],
  generalSkillMoves: 0,
  generalWeakFoot: 0,
  generalHeight: 0,
  positional: {
    ATT: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    },
    MID: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    },
    DEF: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    },
    GK: {
      attWorkRate: [],
      defWorkRate: [],
      skillMoves: 0,
      weakFoot: 0
    }
  }
})

const getParsedPosition = (position) => {
  if (['ST', 'CST', 'LST', 'RST', 'CF', 'LF', 'RF', 'LW', 'RW', ].includes(position)) {
    return 'ATT'
  }
  if (['CAM', 'LCM', 'RCM', 'CM', 'LAM', 'RAM', 'CDM', 'LDM', 'RDM', 'CCDM', 'LM', 'RM'].includes(position)) {
    return 'MID'
  }

  if (['GK'].includes(position)) {
    return 'GK'
  }

  return 'DEF'
}


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
  const [playerToCompare, setPlayerToCompare] = useState(null)
  const [comparing, setComparing] = useState(false)
  const [squadRatings, setSquadRatings] = useState({
    average: 0,
    PAC: 0,
    SHO: 0,
    PAS: 0,
    DRI: 0,
    DEF: 0,
    PHY: 0
  })
  const [squadAttributes, setSquadAttributes] = useState(getInitialSquadAttributes())

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = getTokenFromDocumentCookie()
        const session = await getLoginSessionFromDocumentToken(token)

        if (session) {
          setUser(session)
          await handleLoadStartSquadClick(session)
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
    
    try {
      const response = await axios.get(`http://localhost:3000/api/players/search?name=${playerSearchString}`)
      setDropdownPlayers(response.data.playerItems)
      setShowDropdown(true)
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

  const calculateSquadRating = (initialPlayers = {}) => {
    const usedPlayers = Object.values(initialPlayers).length > 0 ? initialPlayers : selectedPlayers

    const players = Object.values(usedPlayers).filter((player) => player !== null)
  
    if (players.length === 0) {
      setSquadRatings({ average: 0, PAC: 0, SHO: 0, PAS: 0, DRI: 0, DEF: 0, PHY: 0 })
      return
    }
  
    const totalRating = players.reduce((accumulator, player) => accumulator + player.rating, 0)
    const averageRating = totalRating / players.length
    const roundedRating = Math.round(averageRating * 100) / 100
    setSquadRatings({ ...squadRatings, average: roundedRating })
  }

  const calculateSquadAttributes = (initialPlayers = {}) => {
    const usedPlayers = Object.values(initialPlayers).length > 0 ? initialPlayers : selectedPlayers

    const players = Object.keys(usedPlayers).filter((key) => key !== null).map((key) => {
      return {...usedPlayers[key], position: key }
    })

    const initialSquadAttributes = getInitialSquadAttributes()

    if (players.length === 0) {
      setSquadAttributes(initialSquadAttributes)
      return
    }

    const playersPerGeneralPosition = {
      ATT: 0,
      MID: 0,
      DEF: 0,
      GK: 0
    }
    
    const squadAttributes = players.reduce((accumulator, player) => {
      if (!player.playerItemId) return accumulator
      const { clubs, leagues, nations } = accumulator

      const { club, league, nation, attackWorkRate, defenseWorkRate, skillMoves, weakFoot, height } = player

      if (club) {
        clubs[club] = clubs[club] || 0
        clubs[club] += 1
      }

      if (league) {
        leagues[league] = leagues[league] || 0
        leagues[league] += 1
      }

      if (nation) {
        nations[nation] = nations[nation]|| 0
        nations[nation] += 1
      }

      accumulator.clubs = clubs
      accumulator.leagues = leagues
      accumulator.nations = nations

      accumulator.generalSkillMoves += skillMoves
      accumulator.generalWeakFoot += weakFoot
      if (height) accumulator.generalHeight += parseHeight(height)
      accumulator.generalAttWorkRate.push(attackWorkRate)
      accumulator.generalDefWorkRate.push(defenseWorkRate)

      const { positional } = accumulator
      const { position } = player

      const parsedPosition = getParsedPosition(position)

      playersPerGeneralPosition[parsedPosition] += 1
      positional[parsedPosition].attWorkRate.push(attackWorkRate)
      positional[parsedPosition].defWorkRate.push(defenseWorkRate)
      positional[parsedPosition].skillMoves += skillMoves
      positional[parsedPosition].weakFoot += weakFoot

      accumulator.positional = positional

      return accumulator
    }, initialSquadAttributes)

    const processedSquadAttributes = {
      ...squadAttributes,
      generalSkillMoves: parseFloat(squadAttributes.generalSkillMoves / players.length).toFixed(1),
      generalWeakFoot: parseFloat(squadAttributes.generalWeakFoot / players.length).toFixed(1),
      generalHeight: parseFloat(squadAttributes.generalHeight / players.length).toFixed(1),
      generalAttWorkRate: getProcessedWorkRate(squadAttributes.generalAttWorkRate, players.length),
      generalDefWorkRate: getProcessedWorkRate(squadAttributes.generalDefWorkRate, players.length),
      positional: {
        ATT: {
          attWorkRate: getProcessedWorkRate(squadAttributes.positional.ATT.attWorkRate, playersPerGeneralPosition.ATT),
          defWorkRate: getProcessedWorkRate(squadAttributes.positional.ATT.defWorkRate, playersPerGeneralPosition.ATT),
          skillMoves: parseFloat(squadAttributes.positional.ATT.skillMoves / playersPerGeneralPosition.ATT).toFixed(1),
          weakFoot: parseFloat(squadAttributes.positional.ATT.weakFoot / playersPerGeneralPosition.ATT).toFixed(1)
        },
        MID: {
          attWorkRate: getProcessedWorkRate(squadAttributes.positional.MID.attWorkRate, playersPerGeneralPosition.MID),
          defWorkRate: getProcessedWorkRate(squadAttributes.positional.MID.defWorkRate, playersPerGeneralPosition.MID),
          skillMoves: parseFloat(squadAttributes.positional.MID.skillMoves / playersPerGeneralPosition.MID).toFixed(1),
          weakFoot: parseFloat(squadAttributes.positional.MID.weakFoot / playersPerGeneralPosition.MID).toFixed(1)
        },
        DEF: {
          attWorkRate: getProcessedWorkRate(squadAttributes.positional.DEF.attWorkRate, playersPerGeneralPosition.DEF),
          defWorkRate: getProcessedWorkRate(squadAttributes.positional.DEF.defWorkRate, playersPerGeneralPosition.DEF),
          skillMoves: parseFloat(squadAttributes.positional.DEF.skillMoves / playersPerGeneralPosition.DEF).toFixed(1),
          weakFoot: parseFloat(squadAttributes.positional.DEF.weakFoot / playersPerGeneralPosition.DEF).toFixed(1)
        }
      }
    }

    setSquadAttributes(processedSquadAttributes)
  }

  const handleDropdownItemClick = (player) => {
    const updatedSelectedPlayers = { ...selectedPlayers, [selectedPosition]: player }
    
    if (comparing) {
      setPlayerToCompare(player)
      setComparing(false)
    } else {
      setSelectedPlayers(updatedSelectedPlayers)
      setSelectedPlayer(player)
    }
    calculateSquadRating()
    calculateSquadAttributes()
    setShowDropdown(false)
  }

  const handleCompareToClick = () => {
    setComparing(true)

    const input = document.querySelector('input[name="playerName"]')
    input && input.focus()
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

  const handleLoadStartSquadClick = async (session) => {
    try {
      const userId = session.id
      const response = await axios.get(`http://localhost:3000/api/users/${userId}/squads`)

      if (response.data && response.data.squads) {
        const firstSquad = response.data.squads[0]
        const filteredSquads = response.data.squads.filter((squad) => squad !== null)
        setUserSquads(filteredSquads)
        setSquadId(firstSquad.id)
        setSquadName(firstSquad.name)
        setSquadDescription(firstSquad.description)
        setFormation(firstSquad.formation)
        setSelectedPlayers(firstSquad.players || {})
        setInitialState({
          formation: firstSquad.formation,
          selectedPlayers: firstSquad.players || {},
          squadName: firstSquad.name,
          squadDescription: firstSquad.description
        })
        calculateSquadRating(firstSquad.players)
        calculateSquadAttributes(firstSquad.players)
      }
    } catch (error) {
      setSquadId(null)
      setSquadName('')
      setSquadDescription('')
      setFormation('4-4-2')
      setSelectedPlayers({})
      setInitialState({})
      setSquadRatings({
        average: 0,
        PAC: 0,
        SHO: 0,
        PAS: 0,
        DRI: 0,
        DEF: 0,
        PHY: 0
      })
      setSquadAttributes(getInitialSquadAttributes())
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

    calculateSquadRating()
    calculateSquadAttributes()
  }

  const handleSuggestionClick = async (position) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/players/suggestions`, {
        squad: selectedPlayers,
        playerPosition: position
      })

      if (response.data && response.data.playerItems) {
        setDropdownPlayers(response.data.playerItems)
        setShowDropdown(true)
      }
    } catch (error) {
      console.error('Error getting suggestion:', error)
    }
  }

  const handleRemovePlayer = (position) => {
    const updatedSelectedPlayers = { ...selectedPlayers, [position]: null }
    setSelectedPlayers(updatedSelectedPlayers)
    setSelectedPlayer(null)
    calculateSquadRating()
    calculateSquadAttributes()
  }

  const prepareRadarChartData = () => {
    if (selectedPlayer && playerToCompare) {
      return {
        labels: ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"],
        datasets: [
          {
            label: selectedPlayer.name,
            pointRadius: 7,
            backgroundColor: "rgba(34, 202, 236, .2)",
            borderColor: "rgba(34, 202, 236, 1)",
            // Extract attributes for selected player
            data: [
              selectedPlayer.PAC,
              selectedPlayer.SHO,
              selectedPlayer.PAS,
              selectedPlayer.DRI,
              selectedPlayer.DEF,
              selectedPlayer.PHY,
            ],
          },
          {
            label: playerToCompare.name,
            backgroundColor: "rgba(255, 99, 132, .2)",
            borderColor: "rgba(255, 99, 132, 1)",
            // Extract attributes for player to compare
            data: [
              playerToCompare.PAC,
              playerToCompare.SHO,
              playerToCompare.PAS,
              playerToCompare.DRI,
              playerToCompare.DEF,
              playerToCompare.PHY,
            ],
          },
        ],
      };
    }
    return null;
  };

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
                {selectedPlayer && playerToCompare
                  ? (
                  <div>
                    {/* RadarChart component */}
                    <RadarChart radarData={prepareRadarChartData()} />
                  </div>
                ): (
                  selectedPlayer && (
                <div className="flex flex-col items-center text-white mb-2 text-sm">
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
                    <span className="font-bold">League:</span> {selectedPlayer.league}
                  </ul>
                  <ul>
                    <span className="font-bold">Nation:</span> {selectedPlayer.nation}
                  </ul>
                  <ul>
                    <span className="font-bold">Skill Moves:</span> {selectedPlayer.skillMoves}
                  </ul>
                  <ul>
                    <span className="font-bold">Weak Foot:</span> {selectedPlayer.weakFoot}
                  </ul>
                  <ul>
                    <span className="font-bold">Height:</span> {selectedPlayer.height}
                  </ul>
                  <ul>
                    <span className="font-bold">Att Work Rate:</span> {selectedPlayer.attackWorkRate}
                  </ul>
                  <ul>
                    <span className="font-bold">Def Work Rate:</span> {selectedPlayer.defenseWorkRate}
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
                ))}
                {selectedPlayer && (
                  <div>
                    <button
                      className="relative top-0 right-0 mr-2 mt-2 bg-blue-600 text-white px-2 py-1 rounded-md"
                      onClick={handleCompareToClick}
                    >
                      Compare to
                    </button>
                    
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
                  <div className="card-container" style={{ width: '5rem', height: '6rem', position: 'relative' }}>
                    {selectedPlayers[position.name] ? (
                      <>
                        <button className="plus-button">
                          <p style={{ fontSize: determineFontSize(selectedPlayers[position.name].name) }}>{selectedPlayers[position.name].name}</p>
                          <p className="text-xl">{selectedPlayers[position.name].rating}</p>
                        </button>
                        {/* Display delete button when player exists */}
                        <div
                          className="delete-button"
                          onClick={() => handleRemovePlayer(position.name)}
                          style={{
                            position: 'absolute',
                            bottom: '-10px',
                            right: '-10px',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <span style={{ color: 'black', fontSize: '1.2rem' }}>x</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="empty-card-button z-10"
                          onClick={() => handleSuggestionClick(position.name)}
                          style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                          }}
                        >
                          <FaLightbulb size={40} color="yellow" />
                        </button>
                        <span>+</span>
                      </>
                    )}
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
              <div style={{ height: '30%' }}>
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
                  <h1 className="text-lg mb-2">Squad Name</h1>
                  <input
                    type="text"
                    name="squadName"
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white"
                  />
                </div>
                <div className="mt-4 flex">
                  <div className="formation-div" style={{ width: '60%' }}>
                    <h1 className="text-lg mb-2">Formation</h1>
                    <select
                      name="formation"
                      value={formation}
                      onChange={(e) => setFormation(e.target.value)}
                      className="border border-gray-700 rounded-md px-3 py-2 w-75 bg-gray-800 text-white"
                    >
                      {Object.keys(SQUAD_FORMATIONS_POSITIONS).map((formation) => (
                        <option key={formation} value={formation}>
                          {formation}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="rating-div " style={{ width: '40%' }}>
                    <h1 className="text-lg mb-2">Squad Rating</h1>
                    <p className='text-2xl flex flex-row justify-center items-center'>{squadRatings.average}</p>
                  </div>
                </div>
              </div>
              <div className="pt-1 px-2 rounded" style={{ height: '70%', backgroundColor: '#111457' }}>
                <div>
                  <div className="text-xl mt-1 mb-1 flex flex-row justify-center">Squad Attributes</div>
                </div>
                <table className="w-full">
                  {/* General */}
                  <tr>
                    <td colSpan="3" className="squad-attribute-type-text mt-2 mb-2">General</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex flex-col items-center">
                        <div className="squad-attributes-stats-text">Skill Moves</div>
                        <div className="squad-attributes-stats">{squadAttributes.generalSkillMoves}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        <div className="squad-attributes-stats-text">Weak Foot</div>
                        <div className="squad-attributes-stats">{squadAttributes.generalWeakFoot}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        <div className="squad-attributes-stats-text">Height</div>
                        <div className="squad-attributes-stats">{squadAttributes.generalHeight} cm</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex flex-col items-center">
                        <div className="squad-attributes-stats-text">Att WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.generalAttWorkRate}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        <div className="squad-attributes-stats-text">Def WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.generalDefWorkRate}</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="squad-attribute-type-text mt-2 mb-2">Clubs</td>
                    <td className="squad-attribute-type-text mt-2 mb-2">Leagues</td>
                    <td className="squad-attribute-type-text mt-2 mb-2">Nations</td>
                  </tr>
                  <tr className="text-sm">
                    <td>
                      <div className="flex flex-col items-center">
                        {Object.keys(squadAttributes.clubs).map((club) => (
                          <div className="squad-attributes-stats-text" key={club}>{club}: {squadAttributes.clubs[club]}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        {Object.keys(squadAttributes.leagues).map((league) => (
                          <div className="squad-attributes-stats-text" key={league}>{league}: {squadAttributes.leagues[league]}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        {Object.keys(squadAttributes.nations).map((nation) => (
                          <div className="squad-attributes-stats-text" key={nation}>{nation}: {squadAttributes.nations[nation]}</div>
                        ))}
                      </div>
                    </td>
                  </tr>

                  {/* Positional */}
                  <tr>
                    <td colSpan="3" className="squad-attribute-type-text mt-2 mb-2">Positional</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex flex-col items-center">
                        {/* ATT Data */}
                        <div className="text-sm">ATT</div>
                        <div className="squad-attributes-stats-text">Skill Moves</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.ATT.skillMoves}</div>
                        <div className="squad-attributes-stats-text">Weak Foot</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.ATT.weakFoot}</div>
                        <div className="squad-attributes-stats-text">Att WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.ATT.attWorkRate}</div>
                        <div className="squad-attributes-stats-text">Def WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.ATT.defWorkRate}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        {/* MID Data */}
                        <div className="text-sm">MID</div>
                        <div className="squad-attributes-stats-text">Skill Moves</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.MID.skillMoves}</div>
                        <div className="squad-attributes-stats-text">Weak Foot</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.MID.weakFoot}</div>
                        <div className="squad-attributes-stats-text">Att WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.MID.attWorkRate}</div>
                        <div className="squad-attributes-stats-text">Def WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.MID.defWorkRate}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        {/* DEF Data */}
                        <div className="text-sm">DEF</div>
                        <div className="squad-attributes-stats-text">Skill Moves</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.DEF.skillMoves}</div>
                        <div className="squad-attributes-stats-text">Weak Foot</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.DEF.weakFoot}</div>
                        <div className="squad-attributes-stats-text">Att WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.DEF.attWorkRate}</div>
                        <div className="squad-attributes-stats-text">Def WR</div>
                        <div className="squad-attributes-stats">{squadAttributes.positional.DEF.defWorkRate}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
