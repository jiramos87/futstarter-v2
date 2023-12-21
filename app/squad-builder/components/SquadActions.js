import { handleLoadSquad, handleLoadSquadClick, handleSaveSquadClick, handleUpdateSquadClick } from "../helper"

export const SquadActions = ({ stateSetters }) => {
  const { state, setters } = stateSetters
  return (
    <>
      <button onClick={() => { state.squadId ? handleUpdateSquadClick(stateSetters) : handleSaveSquadClick(stateSetters)}} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
        Save Squad
      </button>
      {state.isSquadSaved && state.squadId && <span className="text-green-500 ml-2">✔</span>}
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
    </>
  )
}