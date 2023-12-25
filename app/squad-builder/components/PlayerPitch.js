import { FaLightbulb } from 'react-icons/fa'

import { SQUAD_FORMATIONS_POSITIONS } from '../../../src/constants/formations'
import { determineFontSize } from '../../../src/utils/font_util'
import { handlePositionSelection, handleRemovePlayer, handleSuggestionClick } from '../helper'

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
              top: `calc(${position.position.top} - 3rem)`,
              left: `calc(${position.position.left} - 2.5rem)`,
            }}
            onClick={() => handlePositionSelection(position.name, stateSetters)}
          >
            <div
              className={`card-container ${state.selectedPosition === position.name ? 'clicked' : ''}`}
              style={{ width: '5rem', height: '6rem', position: 'relative' }}
            >
              {state.selectedPlayers[position.name] ? (
                <>
                  <button className="plus-button">
                    <p style={{ fontSize: determineFontSize(state.selectedPlayers[position.name].name) }}>{state.selectedPlayers[position.name].name}</p>
                    <p className="text-xl">{state.selectedPlayers[position.name].rating}</p>
                  </button>
                  {/* Display delete button when player exists */}
                  <div
                    className="delete-button"
                    onClick={() => handleRemovePlayer(position.name, stateSetters)}
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      right: '-10px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'red',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ color: 'black', fontSize: '1.2rem' }}>x</span>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="empty-card-button z-10"
                    onClick={() => handleSuggestionClick(position.name, stateSetters)}
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                    }}
                  >
                    <FaLightbulb size={40} color="yellow" />
                  </button>
                  <span>+</span>
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