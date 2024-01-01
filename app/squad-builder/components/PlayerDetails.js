import { RadarChart } from "../../components/radar_chart"
import { handleCompareClick, handleSeePlayerDetailedStatsClick, handleSeePlayerFaceStatsClick, handleSeePlayerSuggestionsCompare, prepareRadarChartData } from "../helper"

import { PlayerStats } from "./PlayerStats"
import { PlayerSuggestionsCompare } from "./PlayerSuggestionsCompare"

export const PlayerDetails = ({ stateSetters }) => {
  const { state } = stateSetters

  return (
    <div className="player-details-container">
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
      <div className="player-selected-details" >
        {(state.selectedPlayer && state.showPlayerSuggestionsCompare) &&
          ( <PlayerSuggestionsCompare stateSetters={stateSetters} /> )
        }
        {state.comparing || state.playerToCompare
          ? (<RadarChart radarData={prepareRadarChartData(state.selectedPlayer.player, state.playerToCompare)} stateSetters={stateSetters} />)
          : (<PlayerStats stateSetters={stateSetters} />)
        }
      </div>
    </div>
  )
}
