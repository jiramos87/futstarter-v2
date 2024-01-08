import axios from 'axios'

import { getInitialSquadAttributes, getInitialSquadRatings } from '../../src/constants/squad'
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

export const handleSearchButtonClick = async (stateSetters) => {
  const { state, setters } = stateSetters
  const { useSearchFilters, playerSearchFilters } = state
  const { setDropdownPlayers, setShowDropdown } = setters

  try {
    let url = `http://localhost:3000/api/players/search?`
    if (useSearchFilters) {
      const searchFilterString = getSearchFilterString(playerSearchFilters)

      url += removeFirstQuerySymbolQueryParamsString(searchFilterString)
    }

    const response = await axios.get(url)
    if (response.data && response.data.playerItems) {
      setDropdownPlayers(response.data.playerItems)
      setShowDropdown(true)
    }
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

  const players = Object.values(usedPlayers).filter((pos) => pos !== null).map((pos) => pos.player)

  if (players.length === 0) {
    setSquadRatings({ average: 0, PAC: 0, SHO: 0, PAS: 0, DRI: 0, DEF: 0, PHY: 0 })
    return
  }

  const totalRating = players.reduce((accumulator, player) => accumulator + player.rating, 0)
  const averageRating = totalRating / players.length
  const roundedRating = Math.round(averageRating * 100) / 100
  const totalPAC = players.reduce((accumulator, player) => accumulator + player.PAC, 0)
  const averagePAC = totalPAC / players.length
  const PAC = Math.round(averagePAC * 100) / 100
  const totalSHO = players.reduce((accumulator, player) => accumulator + player.SHO, 0)
  const averageSHO = totalSHO / players.length
  const SHO = Math.round(averageSHO * 100) / 100
  const totalPAS = players.reduce((accumulator, player) => accumulator + player.PAS, 0)
  const averagePAS = totalPAS / players.length
  const PAS = Math.round(averagePAS * 100) / 100
  const totalDRI = players.reduce((accumulator, player) => accumulator + player.DRI, 0)
  const averageDRI = totalDRI / players.length
  const DRI = Math.round(averageDRI * 100) / 100
  const totalDEF = players.reduce((accumulator, player) => accumulator + player.DEF, 0)
  const averageDEF = totalDEF / players.length
  const DEF = Math.round(averageDEF * 100) / 100
  const totalPHY = players.reduce((accumulator, player) => accumulator + player.PHY, 0)
  const averagePHY = totalPHY / players.length
  const PHY = Math.round(averagePHY * 100) / 100

  setSquadRatings({ ...squadRatings, average: roundedRating, PAC, SHO, PAS, DRI, DEF, PHY })
}

export const handleDropdownItemClick = (player, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers, selectedPosition, comparing, formation } = state
  const { setSelectedPlayers, setSelectedPlayer, setPlayerToCompare, setComparing, setShowDropdown } = setters

  const playerIndex = SQUAD_FORMATIONS_POSITIONS[formation].indexOf(SQUAD_FORMATIONS_POSITIONS[formation].find((pos) => pos.name === selectedPosition))

  const updatedSelectedPlayers = { ...selectedPlayers, [playerIndex]: { POS: selectedPosition, player } }

  if (comparing) {
    setPlayerToCompare(player)
    setComparing(false)
  } else {
    setSelectedPlayers(updatedSelectedPlayers)
    setSelectedPlayer({ POS: selectedPosition, player })
  }

  calculateSquadRating({}, stateSetters)
  calculateSquadAttributes({}, stateSetters)
  calculateSquadPrice(stateSetters)
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

  const filteredUserPlayers = Object.values(usedPlayers).filter((pos) => pos !== null)

  const players = filteredUserPlayers.map((pos) => {
    return {...pos.player, position: pos.POS }
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

    const { club, clubId, league, leagueId, nation, nationId, attackWorkRate, defenseWorkRate, skillMoves, weakFoot, height } = player

    if (nation) {
      nations[nation] = nations[nation]|| { count: 0, id: nationId }
      nations[nation].count += 1
    }

    if (club) {
      clubs[club] = clubs[club] || { count: 0, id: clubId }
      clubs[club].count += 1
    }

    if (league) {
      leagues[league] = leagues[league] || { count: 0, id: leagueId }
      leagues[league].count += 1
    }

    accumulator.clubs = clubs
    accumulator.leagues = leagues
    accumulator.nations = nations

    accumulator.generalSkillMoves += skillMoves
    accumulator.generalWeakFoot += weakFoot
    if (height) accumulator.generalHeight += height
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

export const calculateSquadPrice = (stateSetters, initialPlayers = {}) => {
  const { state, setters } = stateSetters
  const { selectedPlayers } = state
  const { setSquadPrice } = setters

  const usedPlayers = Object.values(initialPlayers).length > 0 ? initialPlayers : selectedPlayers

  const players = Object.values(usedPlayers).filter((pos) => pos !== null).map((pos) => pos.player)

  if (players.length === 0) {
    setSquadPrice(0)
    return
  }

  const totalPrice = players.reduce((accumulator, player) => accumulator + player.price, 0)

  setSquadPrice(totalPrice)
}

export const hasSquadChanged = (state) => {
  const { initialState, formation, selectedPlayers, squadName, squadDescription } = state

  return (
    JSON.stringify(initialState) !== JSON.stringify({ formation, selectedPlayers, squadName, squadDescription })
  )
}

export const handlePositionSelection = async (position, stateSetters) => {
  const { state, setters } = stateSetters
  const { selectedPlayers, formation } = state
  const { setSelectedPosition, setSelectedPlayer, setShowSearchField, setDirection } = setters

  setSelectedPosition(position)
  toggleSearchField(stateSetters)
  setShowSearchField(true)
  const input = document.querySelector('input[name="playerName"]')
  input && input.focus()

  const playerIndex = SQUAD_FORMATIONS_POSITIONS[formation].indexOf(SQUAD_FORMATIONS_POSITIONS[formation].find((pos) => pos.name === position))

  const playerInPosition = selectedPlayers[playerIndex]
  setDirection(0)
  if (!playerInPosition) {
    setSelectedPlayer(null)
  } else {
    setSelectedPlayer(playerInPosition)

    if (state.showPlayerSuggestionsCompare) await findSuggestionsToCompare('rating', stateSetters, 'desc')
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
  const { setComparing, setShowPlayerFaceStats, setShowPlayerDetailedStats, setSelectedPlayerDetailsOption, setShowPlayerSuggestionsCompare } = setters
  setShowPlayerFaceStats(false)
  setShowPlayerDetailedStats(false)
  setShowPlayerSuggestionsCompare(false)
  setComparing(true)
  setSelectedPlayerDetailsOption('compare')
}

export const handleSeePlayerSuggestionsCompare = async (stateSetters) => {
  const { setters } = stateSetters
  const { setShowPlayerFaceStats, setShowPlayerDetailedStats, setSelectedPlayerDetailsOption, setShowPlayerSuggestionsCompare, setComparing, setPlayerToCompare } = setters

  await findSuggestionsToCompare('rating', stateSetters)

  setComparing(false)
  setPlayerToCompare(null)
  setShowPlayerFaceStats(false)
  setShowPlayerDetailedStats(false)
  setShowPlayerSuggestionsCompare(true)
  setSelectedPlayerDetailsOption('suggestions')
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
        setSelectedPosition(Object.values(selectedSquad.players)[0].POS)
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
  calculateSquadPrice(stateSetters)
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
        setSelectedPosition(firstPlayer.POS)
      }

      setInitialState({
        formation: firstSquad.formation,
        selectedPlayers: firstSquad.players || {},
        squadName: firstSquad.name,
        squadDescription: firstSquad.description
      })
      calculateSquadRating(firstSquad.players, stateSetters)
      calculateSquadAttributes(firstSquad.players, stateSetters)
      calculateSquadPrice(stateSetters)
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

export const findSuggestionsToCompare = async (sortingAttribute, stateSetters, order = null) => {
  const { state, setters } = stateSetters
  const { suggestionCompareLimit, suggestionCompareOrders, selectedPosition } = state
  const { setSuggestionCompareList, setSuggestionCompareOrders } = setters

  try {
    const response = await axios.get(`http://localhost:3000/api/players/suggestions-compare`, {
      params: {
        playerName: state.selectedPlayer.player.name,
        position: selectedPosition,
        sort: sortingAttribute,
        order: suggestionCompareOrders[sortingAttribute],
        limit: suggestionCompareLimit
      }
    })

    if (response.data && response.data.playerItems) {
      setSuggestionCompareList(response.data.playerItems)
      setSuggestionCompareOrders({ ...suggestionCompareOrders, [sortingAttribute]: order || (suggestionCompareOrders[sortingAttribute] === 'asc' ? 'desc' : 'asc') })
    }
  } catch (error) {
    console.error('Error getting suggestions to compare:', error)
    setSuggestionCompareList([])
  }
}

export const handleRemovePlayer = (playerIndex, stateSetters, event) => {
  event.stopPropagation()
  const { state, setters } = stateSetters
  const { selectedPlayers } = state
  const { setSelectedPlayers, setSelectedPlayer } = setters

  const updatedSelectedPlayers = { ...selectedPlayers, [playerIndex]: null }

  setSelectedPlayer(null)
  setSelectedPlayers(updatedSelectedPlayers)
  calculateSquadRating(updatedSelectedPlayers, stateSetters)
  calculateSquadAttributes(updatedSelectedPlayers, stateSetters)
  calculateSquadPrice(stateSetters, updatedSelectedPlayers)
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
  const { setShowPlayerFaceStats, setShowPlayerDetailedStats, setComparing, setPlayerToCompare, setSelectedPlayerDetailsOption, setShowPlayerSuggestionsCompare } = setters
  setComparing(false)
  setShowPlayerDetailedStats(false)
  setPlayerToCompare(null)
  setShowPlayerFaceStats(true)
  setShowPlayerSuggestionsCompare(false)
  setSelectedPlayerDetailsOption('basic')
}

export const handleSeePlayerDetailedStatsClick = (stateSetters) => {
  const { setters } = stateSetters
  const { setShowPlayerFaceStats, setShowPlayerDetailedStats, setComparing, setPlayerToCompare, setSelectedPlayerDetailsOption, setShowPlayerSuggestionsCompare } = setters
  setComparing(false)
  setPlayerToCompare(null)
  setShowPlayerFaceStats(false)
  setShowPlayerDetailedStats(true)
  setShowPlayerSuggestionsCompare(false)
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

export const handleSetFormation = (formation, stateSetters) => {
  const { state, setters } = stateSetters
  const { setFormation, setSelectedPlayers } = setters

  const currentFormation = state.formation

  if (currentFormation === formation) return

  setFormation(formation)
}
