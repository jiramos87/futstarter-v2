import { FaLightbulb, FaTimes } from 'react-icons/fa'

import { SQUAD_FORMATIONS_POSITIONS } from '../../../src/constants/formations'
import { handlePositionSelection, handleRemovePlayer, handleSuggestionClick } from '../helper'
import { PlayerCard } from '../../components/PlayerCard'

export const PlayerPitch = ({ stateSetters }) => {
  const { state, setters } = stateSetters

  return (
    <div className="bg-center">
      {state.user && (
      <>
        <div className="formation-div" style={{ width: '60%' }}>
          <h1 className="text-lg mb-2">Formation</h1>
          <select
            name="formation"
            value={state.formation}
            onChange={(e) => setters.setFormation(e.target.value)}
            className="border border-gray-700 rounded-md px-3 py-2 w-75 bg-gray-800 text-white"
          >
            {Object.keys(SQUAD_FORMATIONS_POSITIONS).map((formation) => (
              <option key={formation} value={formation}>
                {formation}
              </option>
            ))}
          </select>
        </div>
        {SQUAD_FORMATIONS_POSITIONS[state.formation].map((position, index) => (
          <div
            key={index}
            className="absolute text-white flex flex-col items-center"
            style={{
              top: `calc(${position.position.top} - 3.8rem)`,
              left: `calc(${position.position.left} - 3.3rem)`,
              overflow: 'visible'
            }}
            onClick={() => handlePositionSelection(position.name, stateSetters)}
          >
            <div
              className={`card-container ${state.selectedPosition === position.name ? 'clicked' : ''}`}
              style={{ width: '6.7rem', height: '8rem', position: 'relative', overflow: 'visible' }}
            >
              {state.selectedPlayers[position.name] ? (
                <>
                  <button className="h-full w-full flex flex-col items-center justify-center" style={{ overflow: 'visible' }}>
                    <PlayerCard player={state.selectedPlayers[position.name]} size={9.4} />
                  </button>

                  <div
                    className="delete-button"
                    onClick={() => handleRemovePlayer(position.name, stateSetters)}
                    style={{ bottom: '-10px', right: '-10px' }}
                  >
                    <FaTimes size={20} color="black" />
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="z-10"
                    onClick={() => handleSuggestionClick(position.name, stateSetters)}
                    style={{ position: 'absolute', top: '-13px', right: '-13px' }}
                  >
                    <FaLightbulb size={26} color="yellow" />
                  </button>
                  <span className='text-white'>+</span>
                </>
              )}
            </div>
            <div className="rounded-md bg-gray-800 text-white py-1 px-2 mt-2" style={{ fontSize: '0.75rem' }}>
              {position.name}
            </div>
          </div>
        ))}
      </>
    )}
    </div>
  )
}