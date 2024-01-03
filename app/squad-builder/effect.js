import { useEffect } from 'react'

import { getLoginSessionFromDocumentToken, getTokenFromDocumentCookie } from '../../lib/client-cookies'

import { calculateSquadAttributes, calculateSquadPrice, calculateSquadRating, findSuggestionsToCompare, handleLoadStartSquadClick, hasSquadChanged } from './helper'

export const useSquadBuilderEffects = (stateSetters) => {
  const { state, setters } = stateSetters
  const { setUser, setError, setIsSquadSaved } = setters
  const { formation, selectedPlayer, selectedPlayers, selectedPosition, squadName, squadDescription, squadId, suggestionCompareLimit } = state

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = getTokenFromDocumentCookie()
        const session = await getLoginSessionFromDocumentToken(token)
        if (session) {
          setUser(session)
          await handleLoadStartSquadClick(session, stateSetters)
        }
      } catch (error) {
        console.error(error)
        setError(error.message)
      }
    }
    fetchData()
  }, [setUser, setError])

  useEffect(() => {
    const findSuggestions = async () => {
      await findSuggestionsToCompare('rating', stateSetters, 'desc')
    }

     findSuggestions()
 } , [suggestionCompareLimit, selectedPosition, selectedPlayer])

  useEffect(() => {
    if (hasSquadChanged(stateSetters) && squadId) {
      setIsSquadSaved(false)
      calculateSquadPrice(stateSetters)
    }
  }, [formation, selectedPlayers, squadName, squadDescription])

  return
}