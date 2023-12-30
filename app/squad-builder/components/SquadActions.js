import { handleLoadSquad, handleLoadSquadClick, handleNewSquadClick, handleSaveSquadClick, handleUpdateSquadClick } from "../helper"

export const SquadActions = ({ stateSetters }) => {
  const { state, setters } = stateSetters
  return (
    <div style={{ height: '50%'}}>
      <div className="flex flex-row squad-div-title-text justify-start mb-4 p-2">
       SQUAD ACTIONS
      </div>
      <button
        onClick={() => handleNewSquadClick(stateSetters)}
        className="new-squad-button"
      >
        New Squad
      </button>
      <button
        onClick={() => handleLoadSquadClick(stateSetters)}
        className="load-squad-button"
      >
        Load Squad
      </button>
      {state.showLoadSquadDropdown && (
      <div className="dropdown-menu">
        <select
          className="select-squad-button"
          onChange={(e) => handleLoadSquad(parseInt(e.target.value), stateSetters)}
        >
          <option value="">Select Squad</option>
          {state.userSquads.length > 0 ? (
            state.userSquads.map((squad) => (
              <option key={squad.id} value={squad.id}>
                {squad.name}
              </option>
            ))
          ) : (
            <option value="">No Squads</option>
          )}
        </select>
      </div>
      )}
      <div className="mt-4">
        <h1 className="text-lg mb-2">Squad Name</h1>
        <input
          type="text"
          name="squadName"
          value={state.squadName}
          onChange={(e) => setters.setSquadName(e.target.value)}
          className="squad-name-input"
        />
      </div>
      <button onClick={() => { state.squadId ? handleUpdateSquadClick(stateSetters) : handleSaveSquadClick(stateSetters)}} className="save-squad-button">
        Save Squad
      </button>
      {state.isSquadSaved && state.squadId && <span className="text-green-500 ml-2">✔</span>}
    </div>
  )
}