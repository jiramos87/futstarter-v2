import { FaSearch, FaFile, FaTrophy } from 'react-icons/fa'

import { toggleSearchField, toggleSquadActions, toggleSquadAttributes } from '../helper'

export const SquadVerticalNav = ({ stateSetters }) => {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#4d88ff' }}>
      <button
        className="text-3xl text-white hover:text-gray-400 h-16 p-2 flex items-center justify-center"
        onClick={() => {
          toggleSquadActions(stateSetters)
        }}
      >
        <FaFile />
      </button>
      <button
        className="text-3xl text-white hover:text-gray-400 h-16 p-2 flex items-center justify-center"
        onClick={() => {
          toggleSearchField(stateSetters)
        }}
      >
        <FaSearch />
      </button>

      <button
        className="text-3xl text-white hover:text-gray-400 h-16 p-2 flex items-center justify-center"
        onClick={() => {
          toggleSquadAttributes(stateSetters)
        }}
      >
        <FaTrophy />
      </button>
      
    </div>
  )
}
