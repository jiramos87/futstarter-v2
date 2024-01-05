import { PlayerBasicStats } from './PlayerBasicStats'
import { PlayerDetailedStatistics } from './PlayerStatistics'

export const PlayerStats = ({ stateSetters }) => {
  const { state } = stateSetters
  const { showPlayerFaceStats, showPlayerDetailedStats, selectedPlayer } = state

  return (
    <div className="flex flex-col mt-4 px-4 w-full">
      {(selectedPlayer && showPlayerFaceStats) && (<PlayerBasicStats stateSetters={stateSetters} />)}
      {(selectedPlayer && showPlayerDetailedStats) && (<PlayerDetailedStatistics stateSetters={stateSetters} />)}
    </div>
  )
}
