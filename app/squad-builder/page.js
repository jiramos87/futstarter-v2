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
import { SquadVerticalNav } from './components/SquadVerticalNav'

const SquadBuilderPage = () => {
  const stateSetters = useSquadBuilderState()
  useSquadBuilderEffects(stateSetters)
  const { state } = stateSetters

  const pitchStyles = {
    backgroundImage: "url('/football-pitch.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30rem 42rem', // Set the desired size
    backgroundPosition: 'top center', // Position at the top of the div
    height: '42rem', // Minimum height
    width: '30rem', // Minimum width
    minWidth: '30rem', // Minimum width
    minHeight: '42wrem', // Minimum height
  };

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

        <div className="flex-1 bg-blue-950 p-4" style={{ flexBasis: '25%', color: 'white' }}>
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
      </div>
    </MainLayout>
  );
};

export default SquadBuilderPage;