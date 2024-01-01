import { useEffect } from 'react'

import { getLoginSessionFromDocumentToken, getTokenFromDocumentCookie } from '../../lib/client-cookies'

import { findSuggestionsToCompare, handleLoadStartSquadClick, hasSquadChanged } from './helper'

export const useSquadBuilderEffects = (stateSetters) => {
  const { state, setters } = stateSetters
  const { setUser, setError, setIsSquadSaved } = setters
  const { formation, selectedPlayers, selectedPosition, squadName, squadDescription, squadId, suggestionCompareLimit } = state

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
    if (hasSquadChanged(stateSetters) && squadId) {
      setIsSquadSaved(false)
    }
  }, [formation, selectedPlayers, squadName, squadDescription])



  useEffect(() => {
     const findSuggestions = async () => {
       await findSuggestionsToCompare('rating', stateSetters, 'desc')
     }

      findSuggestions()
  } , [suggestionCompareLimit, selectedPosition])

  return


}