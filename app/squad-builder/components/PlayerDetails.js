import { RadarChart } from "../../components/radar_chart"
import { handleCompareClick, handleSeePlayerDetailedStatsClick, handleSeePlayerFaceStatsClick, prepareRadarChartData } from "../helper"

import { PlayerStats } from "./PlayerStats"

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
      </div>
      <div className="player-selected-details" >
        {state.comparing || state.playerToCompare
          ? (<RadarChart radarData={prepareRadarChartData(state.selectedPlayer, state.playerToCompare)} stateSetters={stateSetters} />)
          : (<PlayerStats stateSetters={stateSetters} />)
        }
      </div>
    </div>
  )
}
