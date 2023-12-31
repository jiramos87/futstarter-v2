import axios from 'axios'

import { getInitialSquadAttributes, getInitialSquadRatings } from '../../src/constants/squad'
import { parseHeight } from '../../src/utils/string_util'
import { SQUAD_FORMATIONS_POSITIONS } from '../../src/constants/formations'

const getSearchFilterString = (searchFilters) => {
  if (!searchFilters) return ''

  let searchFilterString = ''

  if (searchFilters.league) searchFilterString += `&league=${searchFilters.league}`
  if (searchFilters.club) searchFilterString += `&club=${searchFilters.club}`
  if (searchFilters.nation) searchFilterString += `&nation=${searchFilters.nation}`
  if (searchFilters.position) searchFilterString += `&position=${searchFilters.position}`
  searchFilterString += `&minRating=${searchFilters.minRating}`
  searchFilterString += `&maxRating=${searchFilters.maxRating}`
  searchFilterString += `&minPrice=${searchFilters.minPrice}`
  searchFilterString += `&maxPrice=${searchFilters.maxPrice}`
  searchFilterString += `&minPAC=${searchFilters.minPAC}`
  searchFilterString += `&maxPAC=${searchFilters.maxPAC}`
  searchFilterString += `&minSHO=${searchFilters.minSHO}`
  searchFilterString += `&maxSHO=${searchFilters.maxSHO}`
  searchFilterString += `&minPAS=${searchFilters.minPAS}`
  searchFilterString += `&maxPAS=${searchFilters.maxPAS}`
  searchFilterString += `&minDRI=${searchFilters.minDRI}`
  searchFilterString += `&maxDRI=${searchFilters.maxDRI}`
  searchFilterString += `&minDEF=${searchFilters.minDEF}`
  searchFilterString += `&maxDEF=${searchFilters.maxDEF}`
  searchFilterString += `&minPHY=${searchFilters.minPHY}`
  searchFilterString += `&maxPHY=${searchFilters.maxPHY}`
  searchFilterString += `&minSkillMoves=${searchFilters.minSkillMoves}`
  searchFilterString += `&maxSkillMoves=${searchFilters.maxSkillMoves}`
  searchFilterString += `&minWeakFoot=${searchFilters.minWeakFoot}`
  searchFilterString += `&maxWeakFoot=${searchFilters.maxWeakFoot}`
  searchFilterString += `&minHeight=${searchFilters.minHeight}`
  searchFilterString += `&maxHeight=${searchFilters.maxHeight}`

  return searchFilterString
}

export const handlePlayerSearchChange = async (e, stateSetters) => {
  const { state, setters } = stateSetters
  const { useSearchFilters, playerSearchFilters } = state
  const { setPlayerSearchString, setDropdownPlayers, setShowDropdown } = setters
  const inputPlayerName = e.target.value

  setPlayerSearchString(inputPlayerName)

  try {
    let url = `http://localhost:3000/api/players/search?name=${inputPlayerName}`

    if (useSearchFilters) {
      const searchFilterString = getSearchFilterString(playerSearchFilters)
      url += searchFilterString
    }

    const response = await axios.get(url)

    setDropdownPlayers(response.data.playerItems)
    setShowDropdown(true)
  } catch (error) {
    console.error('search axios error', error)
    setDropdownPlayers([])
  }
}

const removeFirstQuerySymbolQueryParamsString = (url) => {
  if (url[0] === '&') {
    return url.slice(1)
  }

  return url
}

export const handleSearchButtonClick = (stateSetters) => {
  const { state, setters } = stateSetters
  const { useSearchFilters, playerSearchFilters } = state
  const { setDropdownPlayers, setShowDropdown } = setters

  try {
    let url = `http://localhost:3000/api/players/search?`
    if (useSearchFilters) {
      const searchFilterString = getSearchFilterString(playerSearchFilters)

      url += removeFirstQuerySymbolQueryParamsString(searchFilterString)
    }

    const response = axios.get(url)

    setDropdownPlayers(response.data.playerItems)
    setShowDropdown(true)
  } catch (error) {
    console.error('search axios error', error)
    setDropdownPlayers([])
  }
}


export const calculateSquadRating = (initialPlayers = {}, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers, squadRatings } = state
  const { setSquadRatings } = setters

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

export const handleDropdownItemClick = (player, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers, selectedPosition, comparing } = state
  const { setSelectedPlayers, setSelectedPlayer, setPlayerToCompare, setComparing, setShowDropdown } = setters
  const updatedSelectedPlayers = { ...selectedPlayers, [selectedPosition]: player }

  if (comparing) {
    setPlayerToCompare(player)
    setComparing(false)
  } else {
    setSelectedPlayers(updatedSelectedPlayers)
    setSelectedPlayer(player)
  }

  calculateSquadRating({}, stateSetters)
  calculateSquadAttributes({}, stateSetters)
  setShowDropdown(false)
}

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

export   const calculateSquadAttributes = (initialPlayers = {}, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers } = state
  const { setSquadAttributes } = setters
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

export const hasSquadChanged = (state) => {
  const { initialState, formation, selectedPlayers, squadName, squadDescription } = state

  return (
    JSON.stringify(initialState) !== JSON.stringify({ formation, selectedPlayers, squadName, squadDescription })
  )
}

export const handlePositionSelection = (position, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers } = state
  const { setSelectedPosition, setSelectedPlayer, setShowSearchField } = setters

  setSelectedPosition(position)
  toggleSearchField(stateSetters)
  setShowSearchField(true)
  const input = document.querySelector('input[name="playerName"]')
  input && input.focus()
  if (!selectedPlayers[position]) {
    setSelectedPlayer(null)
  } else {
    setSelectedPlayer(selectedPlayers[position])
  }
}

export const toggleUseSearchFilters = (stateSetters) => {
  const { state, setters } = stateSetters
  const { useSearchFilters } = state
  const { setUseSearchFilters } = setters

  setUseSearchFilters(!useSearchFilters)
}

export  const handleCompareClick = (stateSetters) => {
  const { setters } = stateSetters
  const { setComparing, setShowPlayerFaceStats, setShowPlayerDetailedStats, setSelectedPlayerDetailsOption } = setters
  setShowPlayerFaceStats(false)
  setShowPlayerDetailedStats(false)
  setComparing(true)
  setSelectedPlayerDetailsOption('compare')
}

export const handleSaveSquadClick = async (stateSetters) => {
  const { state, setters } = stateSetters
  const { user, formation, selectedPlayers, squadName, squadDescription } = state
  const { setSquadId, setIsSquadSaved, setInitialState } = setters

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

export const handleUpdateSquadClick = async (stateSetters) => {
  const { state, setters } = stateSetters
  const { user, formation, selectedPlayers, squadName, squadDescription, squadId } = state
  const { setIsSquadSaved, setInitialState } = setters

  try {
    const userId = user.id
    const squadData = {
      name: squadName,
      description: squadDescription,
      formation,
      players: selectedPlayers,
    }

    if (squadId) {
      await axios.put(`http://localhost:3000/api/users/${userId}/squads/${squadId}`, squadData)
      setIsSquadSaved(true)
      setInitialState({ formation, selectedPlayers, squadName, squadDescription })
    }
  } catch (error) {
    console.error('Error updating squad:', error)
  }
}

export const handleLoadSquadClick = async (stateSetters) => {
  const { state, setters } = stateSetters
  const { user, showLoadSquadDropdown } = state
  const { setUserSquads, setShowLoadSquadDropdown } = setters

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

export const handleLoadSquad = (squadId, stateSetters) => {
  const { state, setters } = stateSetters
  const { userSquads } = state
  const { setSquadId, setSquadName, setSquadDescription, setFormation, setSelectedPlayers, setInitialState, setShowLoadSquadDropdown, setSelectedPlayer, setSelectedPosition } = setters

  if (squadId) {
    const selectedSquad = userSquads.find((squad) => squad.id === squadId)

    if (selectedSquad) {
      setSquadId(selectedSquad.id)
      setSquadName(selectedSquad.name)
      setSquadDescription(selectedSquad.description)
      setFormation(selectedSquad.formation)
      setSelectedPlayers(selectedSquad.players || {})

      const firstPlayer = Object.values(selectedSquad.players)[0]
      if (firstPlayer) {
        setSelectedPlayer(firstPlayer)
        setSelectedPosition(Object.keys(selectedSquad.players)[0])
      }

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

  calculateSquadRating({}, stateSetters)
  calculateSquadAttributes({}, stateSetters)
}

export const handleLoadStartSquadClick = async (session, stateSetters) => {
  const { setters } = stateSetters
  const { setSquadId, setSquadName, setSquadDescription, setFormation, setSelectedPlayers, setInitialState, setUserSquads, setShowSquadAttributes, setSquadRatings, setSquadAttributes, setSelectedPlayer, setSelectedPosition } = setters

  try {
    const userId = session.id
    const response = await axios.get(`http://localhost:3000/api/users/${userId}/squads`)

    if (response.data && response.data.squads) {
      const filteredSquads = response.data.squads.filter((squad) => squad !== null)
      const firstSquad = filteredSquads[0]
      setUserSquads(filteredSquads)
      setSquadId(firstSquad.id)
      setSquadName(firstSquad.name)
      setSquadDescription(firstSquad.description)
      setFormation(firstSquad.formation)
      handleSeePlayerFaceStatsClick(stateSetters)
      setSelectedPlayers(firstSquad.players || {})
      const firstPlayer = Object.values(firstSquad.players)[0]
      if (firstPlayer) {
        setSelectedPlayer(firstPlayer)
        setSelectedPosition(Object.keys(firstSquad.players)[0])
      }

      setInitialState({
        formation: firstSquad.formation,
        selectedPlayers: firstSquad.players || {},
        squadName: firstSquad.name,
        squadDescription: firstSquad.description
      })
      calculateSquadRating(firstSquad.players, stateSetters)
      calculateSquadAttributes(firstSquad.players, stateSetters)
      setShowSquadAttributes(true)
    }
  } catch (error) {
    setSquadId(null)
    setSquadName('')
    setSquadDescription('')
    setFormation('4-4-2')
    setSelectedPlayers({})
    setInitialState({})
    setSquadRatings(getInitialSquadRatings())
    setSquadAttributes(getInitialSquadAttributes())
  }
}

export const handleSuggestionClick = async (position, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers } = state
  const { setDropdownPlayers, setShowDropdown, setShowSearchField } = setters
  try {
    const response = await axios.post(`http://localhost:3000/api/players/suggestions`, {
      squad: selectedPlayers,
      playerPosition: position
    })

    if (response.data && response.data.playerItems) {
      toggleSearchField(stateSetters)
      setShowSearchField(true)
      setDropdownPlayers(response.data.playerItems)
      setShowDropdown(true)
    }
  } catch (error) {
    console.error('Error getting suggestion:', error)
  }
}

export const handleRemovePlayer = (position, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers } = state
  const { setSelectedPlayers, setSelectedPlayer } = setters

  const updatedSelectedPlayers = { ...selectedPlayers, [position]: null }
  setSelectedPlayers(updatedSelectedPlayers)
  setSelectedPlayer(null)
  calculateSquadRating({}, stateSetters)
  calculateSquadAttributes({}, stateSetters)
}

const getPlayerRadarData = (player, borderColor, backgroundColor) => ({
  label: player.name,
  pointRadius: 7,
  backgroundColor: backgroundColor,
  borderColor: borderColor,
  data: [
    player.PAC,
    player.SHO,
    player.PAS,
    player.DRI,
    player.DEF,
    player.PHY
  ]
})

export const prepareRadarChartData = (selectedPlayer, playerToCompare) => {
  const chartData = {
    labels: ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"],
    datasets: []
  }
  if (selectedPlayer) {
    chartData.datasets.push(getPlayerRadarData(
      selectedPlayer,
      "rgba(34, 202, 236, 1)",
      "rgba(34, 202, 236, .2)"
    ))
  }

  if (playerToCompare) {
    chartData.datasets.push(getPlayerRadarData(
      playerToCompare,
      "rgba(255, 99, 132, 1)",
      "rgba(255, 99, 132, .2)"
    ))
  }

  return chartData
}

export const toggleSearchField = (stateSetters) => {
  const { setters } = stateSetters
  const { setShowSearchField, setShowSquadActions, setShowSquadAttributes, setSelectedSquadVerticalNavOption } = setters
  setShowSquadAttributes(false)
  setShowSquadActions(false)
  setSelectedSquadVerticalNavOption('search')
  setShowSearchField(prevState => !prevState)
}

export const toggleSquadActions = (stateSetters) => {
  const { setters } = stateSetters
  const { setShowSquadActions, setShowSearchField, setShowSquadAttributes, setSelectedSquadVerticalNavOption } = setters
  setShowSquadAttributes(false)
  setShowSearchField(false)
  setSelectedSquadVerticalNavOption('actions')
  setShowSquadActions(prevState => !prevState)
}

export const toggleSquadAttributes = (stateSetters) => {
  const { setters } = stateSetters
  const { setShowSquadAttributes, setShowSquadActions, setShowSearchField, setSelectedSquadVerticalNavOption } = setters
  setShowSearchField(false)
  setShowSquadActions(false)
  setSelectedSquadVerticalNavOption('attributes')
  setShowSquadAttributes(prevState => !prevState)
}

export const handleSeePlayerFaceStatsClick = (stateSetters) => {
  const { setters } = stateSetters
  const { setShowPlayerFaceStats, setShowPlayerDetailedStats, setComparing, setPlayerToCompare, setSelectedPlayerDetailsOption } = setters
  setComparing(false)
  setShowPlayerDetailedStats(false)
  setPlayerToCompare(null)
  setShowPlayerFaceStats(true)
  setSelectedPlayerDetailsOption('basic')
}

export const handleSeePlayerDetailedStatsClick = (stateSetters) => {
  const { setters } = stateSetters
  const { setShowPlayerFaceStats, setShowPlayerDetailedStats, setComparing, setPlayerToCompare, setSelectedPlayerDetailsOption } = setters
  setComparing(false)
  setPlayerToCompare(null)
  setShowPlayerFaceStats(false)
  setShowPlayerDetailedStats(true)
  setSelectedPlayerDetailsOption('ig')
}

export const handleAddPlayerToCompareClick = (stateSetters) => {
  const { setters } = stateSetters
  const { setShowSearchField } = setters
  toggleSearchField(stateSetters)
  setShowSearchField(true)

  const input = document.querySelector('input[name="playerName"]')
  input && input.focus()
}

export const handleNewSquadClick = (stateSetters) => {
  const { setters } = stateSetters
  const { setSquadId, setSquadName, setSquadDescription, setFormation, setSelectedPlayers, setInitialState, setShowSquadAttributes, setSquadRatings, setSquadAttributes } = setters

  setSquadId(null)
  setSquadName('')
  setSquadDescription('')
  setFormation('4-4-2')
  setSelectedPlayers({})
  setInitialState({})
  setSquadRatings(getInitialSquadRatings())
  setSquadAttributes(getInitialSquadAttributes())
  setShowSquadAttributes(false)
}

const getNewSquadPositions = (newFormation, state) => {
  const { selectedPlayers } = state

  const currentPositions = Object.keys(selectedPlayers)

  const newPositions = SQUAD_FORMATIONS_POSITIONS[newFormation].map((position) => position.name)

  const newSelectedPlayers = {}

  for (let i = 0; i < newPositions.length; i++) {
    const newPosition = newPositions[i]
    const currentPosition = currentPositions[i]

    if (currentPosition) {
      newSelectedPlayers[newPosition] = selectedPlayers[currentPosition]
    } else {
      newSelectedPlayers[newPosition] = null
    }
  }
  
  return newSelectedPlayers
}

export const handleSetFormation = (formation, stateSetters) => {
  const { state, setters } = stateSetters
  const { setFormation, setSelectedPlayers } = setters

  const currentFormation = state.formation

  if (currentFormation === formation) return

  const newSelectedPlayers = getNewSquadPositions(formation, state)

  setFormation(formation)
  setSelectedPlayers(newSelectedPlayers)
}
