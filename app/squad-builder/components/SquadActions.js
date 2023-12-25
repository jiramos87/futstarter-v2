import { handleLoadSquad, handleLoadSquadClick, handleNewSquadClick, handleSaveSquadClick, handleUpdateSquadClick } from "../helper"

export const SquadActions = ({ stateSetters }) => {
  const { state, setters } = stateSetters
  return (
    <div className="flex flex-col justify-start squad-attributes-div px-3" style={{ height: '50%'}}>
      <div className="flex flex-row squad-div-title-text justify-start mb-4 p-2">
       SQUAD ACTIONS
      </div>
      <button
        onClick={() => handleNewSquadClick(stateSetters)}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        New Squad
      </button>
      <button
        onClick={() => handleLoadSquadClick(stateSetters)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Load Squad
      </button>
      {state.showLoadSquadDropdown && (
      <div className="dropdown-menu">
        <select
          className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white mt-4 z-10"
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
          className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white"
        />
      </div>
      <button onClick={() => { state.squadId ? handleUpdateSquadClick(stateSetters) : handleSaveSquadClick(stateSetters)}} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
        Save Squad
      </button>
      {state.isSquadSaved && state.squadId && <span className="text-green-500 ml-2">✔</span>}
    </div>
  )
}