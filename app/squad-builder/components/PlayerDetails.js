import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

import { RadarChart } from "../../components/radar_chart"
import { handleCompareClick, handleSeePlayerDetailedStatsClick, handleSeePlayerFaceStatsClick, handleSeePlayerSuggestionsCompare, prepareRadarChartData } from "../helper"

import { PlayerStats } from "./PlayerStats"
import { PlayerSuggestionsCompare } from "./PlayerSuggestionsCompare"
import { SQUAD_FORMATIONS_POSITIONS } from "../../../src/constants/formations"

export const PlayerDetails = ({ stateSetters }) => {
  const { state, setters } = stateSetters

  const handleSetAdjacentPlayer = (direction) => {
    const { selectedPlayer, selectedPlayers } = state
    const { setSelectedPlayer, setSelectedPosition, setDirection } = setters
    setDirection(direction)

    const playerIndex = SQUAD_FORMATIONS_POSITIONS[state.formation].findIndex(
      (position) => position.name === selectedPlayer.POS
    );
  
    const newIndex = playerIndex + direction
  
    const adjustedIndex = newIndex < 0
      ? SQUAD_FORMATIONS_POSITIONS[state.formation].length - 1
      : newIndex >= SQUAD_FORMATIONS_POSITIONS[state.formation].length
        ? 0
        : newIndex

    const adjacentPlayer = selectedPlayers[adjustedIndex]
    const adjustedPosition = SQUAD_FORMATIONS_POSITIONS[state.formation][adjustedIndex].name

    setSelectedPosition(adjustedPosition)
    if (adjacentPlayer) {
      setSelectedPlayer(adjacentPlayer)
    } else {
      setSelectedPlayer({ POS: adjustedPosition, player: null })
    }
  }

  return (
    <div className="player-details flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="player-detail-selector-buttons">
          <button
            className={`${state.selectedPlayerDetailsOption === 'basic' ? 'details-button-selected' : 'player-details-button '}`}
            onClick={() => handleSeePlayerFaceStatsClick(stateSetters)}
          >
            Basic Stats
          </button>
          <button
            className={`${state.selectedPlayerDetailsOption === 'ig' ? 'details-button-selected' : 'player-details-button '}`}
            onClick={() => handleSeePlayerDetailedStatsClick(stateSetters)}
          >
            IG Stats
          </button>
          <button
            className={`${state.selectedPlayerDetailsOption === 'compare' ? 'details-button-selected' : 'player-details-button '}`}
            onClick={() => handleCompareClick(stateSetters)}
          >
            Compare
          </button>
          <button
            className={`${state.selectedPlayerDetailsOption === 'suggestions' ? 'details-button-selected' : 'player-details-button '}`}
            onClick={async () => await handleSeePlayerSuggestionsCompare(stateSetters)}
          >
            Suggestions
          </button>
        </div>
        <div className="flex flex-row justify-between mx-4 my-3 align-center w-full">
          <button
            className="player-details-next-button"
            onClick={() => handleSetAdjacentPlayer(1)}
          >
            <IoIosArrowBack size={30} />
          </button>
          <h1>
            {state.selectedPosition}
          </h1>
          <button
            className="player-details-next-button"
            onClick={() => handleSetAdjacentPlayer(-1)}
          >
            <IoIosArrowForward size={30} />
          </button>
        </div>
      </div>
      <div className={`player-selected-details ${state.direction === 1 ? 'exiting-forward' : (state.direction === -1 ? 'exiting-back' : '') }`}>
        {(state.selectedPlayer && state.showPlayerSuggestionsCompare) &&
          (<PlayerSuggestionsCompare stateSetters={stateSetters} />)
        }
        {state.comparing || state.playerToCompare
          ? (<RadarChart radarData={prepareRadarChartData(state.selectedPlayer.player, state.playerToCompare)} stateSetters={stateSetters} />)
          : (<PlayerStats stateSetters={stateSetters} />)
        }
      </div>
    </div>
  )
}
