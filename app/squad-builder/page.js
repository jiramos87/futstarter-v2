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
      <div className="squad-builder-container">
        <div style={{ flexBasis: '5%' }}>
          <SquadVerticalNav stateSetters={stateSetters} />
        </div>
        
        {state.user && (
        <div className="squad-tool-container" style={{ flexBasis: '14%' }}>
          {state.showSquadActions && <SquadActions stateSetters={stateSetters} />}
          {state.showSearchField && <PlayerSearchField stateSetters={stateSetters} />}
          {state.showSquadAttributes && <SquadAttributes stateSetters={stateSetters} />}
        </div>
        )}
        {!state.user && (<><WelcomeLogin /></>)}
        
        <div className="player-pitch-container" style={{ flexBasis: '56%' }}>
          <PlayerPitch stateSetters={stateSetters} />
        </div>

        <div style={{ flexBasis: '25%' }}>
          <PlayerDetails stateSetters={stateSetters} />
        </div>
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
