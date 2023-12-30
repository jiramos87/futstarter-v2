import { FaSearch, FaFile, FaTrophy } from 'react-icons/fa'

import { toggleSearchField, toggleSquadActions, toggleSquadAttributes } from '../helper'

export const SquadVerticalNav = ({ stateSetters }) => {
  const { state } = stateSetters
  return (
    <div className="squad-vertical-navbar">
      <button
        className={`${state.selectedSquadVerticalNavOption === 'actions' ? 'squad-vertical-nav-link-selected' : 'squad-vertical-nav-link'}`}
        onClick={() => {
          toggleSquadActions(stateSetters)
        }}
      >
        <FaFile />
      </button>
      <button
        className={`${state.selectedSquadVerticalNavOption === 'search' ? 'squad-vertical-nav-link-selected' : 'squad-vertical-nav-link'}`}
        onClick={() => {
          toggleSearchField(stateSetters)
        }}
      >
        <FaSearch />
      </button>

      <button
        className={`${state.selectedSquadVerticalNavOption === 'attributes' ? 'squad-vertical-nav-link-selected' : 'squad-vertical-nav-link'}`}
        onClick={() => {
          toggleSquadAttributes(stateSetters)
        }}
      >
        <FaTrophy />
      </button>
      
    </div>
  )
}
