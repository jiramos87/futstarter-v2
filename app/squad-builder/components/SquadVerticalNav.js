import { FaSearch, FaFile, FaTrophy } from 'react-icons/fa'

import { toggleSearchField, toggleSquadActions, toggleSquadAttributes } from '../helper'

export const SquadVerticalNav = ({ stateSetters }) => {
  const { state } = stateSetters
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#4d88ff' }}>
      <button
        className={`text-3xl hover:text-gray-400 h-16 p-2 flex items-center justify-center ${state.selectedSquadVerticalNavOption === 'actions' ? 'text-white' : 'text-gray-400'}`}
        onClick={() => {
          toggleSquadActions(stateSetters)
        }}
      >
        <FaFile />
      </button>
      <button
        className={`text-3xl hover:text-gray-400 h-16 p-2 flex items-center justify-center ${state.selectedSquadVerticalNavOption === 'search' ? 'text-white' : 'text-gray-400'}`}
        onClick={() => {
          toggleSearchField(stateSetters)
        }}
      >
        <FaSearch />
      </button>

      <button
        className={`text-3xl hover:text-gray-400 h-16 p-2 flex items-center justify-center ${state.selectedSquadVerticalNavOption === 'attributes' ? 'text-white' : 'text-gray-400'}`}
        onClick={() => {
          toggleSquadAttributes(stateSetters)
        }}
      >
        <FaTrophy />
      </button>
      
    </div>
  )
}
