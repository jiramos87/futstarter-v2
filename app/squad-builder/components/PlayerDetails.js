import { RadarChart } from "../../components/radar_chart"
import { handleCompareClick, handleSeePlayerDetailedStatsClick, handleSeePlayerFaceStatsClick, prepareRadarChartData } from "../helper"

import { PlayerStats } from "./PlayerStats"

export const PlayerDetails = ({ stateSetters }) => {
  const { state } = stateSetters

  return (
    <div>
      <div className="flex flex-row justify-start bg-blue-600">
        <button
          className={`relative top-0 right-0 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700 ${state.selectedPlayerDetailsOption === 'basic' ? 'bg-blue-700' : ''}`}
          onClick={() => handleSeePlayerFaceStatsClick(stateSetters)}
        >
          Basic Stats
        </button>
        <button
          className={`relative top-0 right-0 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700 ${state.selectedPlayerDetailsOption === 'ig' ? 'bg-blue-700' : ''}`}
          onClick={() => handleSeePlayerDetailedStatsClick(stateSetters)}
        >
          IG Stats
        </button>
        <button
          className={`relative top-0 right-0 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700 ${state.selectedPlayerDetailsOption === 'compare' ? 'bg-blue-700' : ''}`}
          onClick={() => handleCompareClick(stateSetters)}
        >
          Compare
        </button>
      </div>
      {state.comparing || state.playerToCompare
        ? (<RadarChart radarData={prepareRadarChartData(state.selectedPlayer, state.playerToCompare)} stateSetters={stateSetters} />)
        : (<PlayerStats stateSetters={stateSetters} />)
      }
    </div>
  )
}
