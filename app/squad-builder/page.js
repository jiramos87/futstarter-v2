'use client'

import MainLayout from '../layouts/main_layout'
import { RadarChart } from '../components/radar_chart'

import { useSquadBuilderState } from './state'
import {
  handleSeePlayerDetailsClick,
  handleCompareToClick,
  prepareRadarChartData,
} from './helper'
import { useSquadBuilderEffects } from './effect'
import { PlayerSearchField } from './components/PlayerSearchField'
import { PlayerBasicStats } from './components/PlayerBasicStats'
import { PlayerPitch } from './components/PlayerPitch'
import { SquadAttributes } from './components/SquadAttributes'
import { SquadActions } from './components/SquadActions'
import { WelcomeLogin } from './components/WelcomeLogin'

const SquadBuilderPage = () => {
  const stateSetters = useSquadBuilderState()
  useSquadBuilderEffects(stateSetters)
  const { state } = stateSetters

  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {state.user && (
            <>
              <PlayerSearchField stateSetters={stateSetters} />
              
              <div className="flex-1 p-4 rounded-md" style={{ height: '50%', backgroundColor: '#111457' }}>
                {state.selectedPlayer && state.playerToCompare
                  ? (<RadarChart radarData={prepareRadarChartData(state.selectedPlayer, state.playerToCompare)}/>)
                  : state.selectedPlayer && (<PlayerBasicStats stateSetters={stateSetters} />)
                }
                {state.selectedPlayer && (
                  <div className='mt-10'>
                    <button
                      className="relative top-0 right-0 mr-2 mt-2 bg-blue-600 text-white px-2 py-1 rounded-md"
                      onClick={() => handleCompareToClick(document, stateSetters)}
                    >
                      Compare to
                    </button>
                    <button
                      className="relative top-0 right-0 mr-2 mt-2 bg-blue-600 text-white px-2 py-1 rounded-md"
                      onClick={() => handleSeePlayerDetailsClick(stateSetters)}
                    >
                      Player details
                    </button>
                    
                  </div>
                )}
              </div>
            </>
          )}
          {!state.user && (<><WelcomeLogin /></>)}
        </div>
        
        <div className="flex-2 bg-blue-900 relative" style={{ flexBasis: '50%' }}>
          <PlayerPitch stateSetters={stateSetters} />
        </div>

        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {state.user && (
            <>
              <div style={{ height: '15%' }}>
                <SquadActions stateSetters={stateSetters} />
              </div>
              <div className="flex flex-col justify-start pt-1 px-2 rounded" style={{ height: '85%', backgroundColor: '#111457' }}>
                <SquadAttributes stateSetters={stateSetters} />
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
