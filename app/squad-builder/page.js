'use client'

import MainLayout from '../layouts/main_layout'
import { RadarChart } from '../components/radar_chart'
import { pitchStyles } from '../styles/pitch_styles'

import { useSquadBuilderState } from './state'
import {
  prepareRadarChartData,
  handleSeePlayerFaceStatsClick,
  handleSeePlayerDetailedStatsClick,
  handleCompareClick,
} from './helper'
import { useSquadBuilderEffects } from './effect'
import { PlayerSearchField } from './components/PlayerSearchField'
import { PlayerPitch } from './components/PlayerPitch'
import { SquadAttributes } from './components/SquadAttributes'
import { SquadActions } from './components/SquadActions'
import { WelcomeLogin } from './components/WelcomeLogin'
import { SquadVerticalNav } from './components/SquadVerticalNav'
import { PlayerStats } from './components/PlayerStats'

const SquadBuilderPage = () => {
  const stateSetters = useSquadBuilderState()
  useSquadBuilderEffects(stateSetters)
  const { state } = stateSetters

  return (
    <MainLayout>
      <div className="flex h-full w-full bg-blue-900">
        <div className="flex-1 bg-blue-900 p-0" style={{ flexBasis: '5%', color: 'white' }}>
          <SquadVerticalNav stateSetters={stateSetters} />
        </div>
        
        {state.user && (
        <div className="flex-1 bg-blue-950 p-4" style={{ flexBasis: '20%', color: 'white' }}>
          {state.showSquadActions && <SquadActions stateSetters={stateSetters} />}
          {state.showSearchField && <PlayerSearchField stateSetters={stateSetters} />}
          {state.showSquadAttributes && <SquadAttributes stateSetters={stateSetters} />}
        </div>
        )}
        {!state.user && (<><WelcomeLogin /></>)}
        
        <div className="flex-2 relative" style={{ ...pitchStyles, flexBasis: '50%' }}>
          <PlayerPitch stateSetters={stateSetters} />
        </div>

        <div className="flex-1 bg-blue-950" style={{ flexBasis: '25%', color: 'white' }}>
          <div className="flex flex-row justify-start bg-blue-600">
            <button
              className="relative top-0 right-0 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700"
              onClick={() => handleSeePlayerFaceStatsClick(stateSetters)}
            >
              Basic Stats
            </button>
            <button
              className="relative top-0 right-0 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700"
              onClick={() => handleSeePlayerDetailedStatsClick(stateSetters)}
            >
              IG Stats
            </button>
            <button
              className="relative top-0 right-0 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700"
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
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
