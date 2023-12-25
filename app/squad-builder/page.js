'use client'

import MainLayout from '../layouts/main_layout'
import { pitchStyles } from '../styles/pitch_styles'

import { useSquadBuilderState } from './state'

import { useSquadBuilderEffects } from './effect'
import { PlayerSearchField } from './components/PlayerSearchField'
import { PlayerPitch } from './components/PlayerPitch'
import { SquadAttributes } from './components/SquadAttributes'
import { SquadActions } from './components/SquadActions'
import { WelcomeLogin } from './components/WelcomeLogin'
import { SquadVerticalNav } from './components/SquadVerticalNav'
import { PlayerDetails } from './components/PlayerDetails'

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
        <div className="flex-1 bg-blue-950 p-0" style={{ flexBasis: '20%', color: 'white' }}>
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
          <PlayerDetails stateSetters={stateSetters} />
        </div>
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
