import { useState } from 'react'

import { getInitialPlayerSearchFilters } from '../../src/constants/player_search_filters'
import { getInitialSquadAttributes, getInitialSquadRatings } from '../../src/constants/squad'

export const useSquadBuilderState = () => {
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
  const [squadRatings, setSquadRatings] = useState(getInitialSquadRatings())
  const [squadAttributes, setSquadAttributes] = useState(getInitialSquadAttributes())
  const [playerSearchFilters, setPlayerSearchFilters] = useState(getInitialPlayerSearchFilters())
  const [useSearchFilters, setUseSearchFilters] = useState(false)
  const [showSearchField, setShowSearchField] = useState(false)
  const [showSquadActions, setShowSquadActions] = useState(false)
  const [showSquadAttributes, setShowSquadAttributes] = useState(false)

  const state = {
    user,
    error,
    playerSearchString,
    formation,
    selectedPosition,
    showDropdown,
    dropdownPlayers,
    selectedPlayer,
    selectedPlayers,
    squadName,
    squadDescription,
    isSquadSaved,
    initialState,
    squadId,
    userSquads,
    showLoadSquadDropdown,
    playerToCompare,
    comparing,
    squadRatings,
    squadAttributes,
    playerSearchFilters,
    useSearchFilters,
    showSearchField,
    showSquadActions,
    showSquadAttributes
  }

  const setters = {
    setUser,
    setError,
    setPlayerSearchString,
    setFormation,
    setSelectedPosition,
    setShowDropdown,
    setDropdownPlayers,
    setSelectedPlayer,
    setSelectedPlayers,
    setSquadName,
    setSquadDescription,
    setIsSquadSaved,
    setInitialState,
    setSquadId,
    setUserSquads,
    setShowLoadSquadDropdown,
    setPlayerToCompare,
    setComparing,
    setSquadRatings,
    setSquadAttributes,
    setPlayerSearchFilters,
    setUseSearchFilters,
    setShowSearchField,
    setShowSquadActions,
    setShowSquadAttributes
  }

  const stateSetters = {
    state,
    setters
  }

  return stateSetters
}