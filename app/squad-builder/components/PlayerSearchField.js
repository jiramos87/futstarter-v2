import {
  COMMON_NATIONS,
  LEAGUES,
  LEAGUE_CLUBS,
  POSITIONS,
  SKILL_MOVES,
  WEAK_FOOT
} from "../../../src/constants/player_search_filters"
import { handleDropdownItemClick, handlePlayerSearchChange, toggleUseSearchFilters } from "../helper"

export const PlayerSearchField = ({ stateSetters }) => {
  const { state, setters } = stateSetters
  return (
    <div className="flex-1 p-1" style={{ height: '50%'}}>
      <div className="flex flex-row mb-1 align-center justify-around">
        <div className="flex flex-row bg-gray-800 text-white rounded-md p-1 align-center justify-center h-[30px]">
          POS: {state.selectedPosition}
        </div>
        <input
          type="text"
          name="playerName"
          value={state.playerSearchString}
          onChange={(e) => handlePlayerSearchChange(e, stateSetters)}
          placeholder="Search Player"
          className="border border-gray-700 rounded-md w-8/12 bg-gray-800 text-white p-1 h-[30px]"
        />
      </div>

      <div className="flex flex-col">
        <div>
          <input
            type='checkbox'
            id='use-search-filters'
            name='use-search-filters'
            className='mr-2'
            onClick={() => toggleUseSearchFilters(stateSetters)}
          />
          <label htmlFor='use-search-filters' className='ml-2'>Use search filters</label>
        </div>
        <div className='border-b-2 h-full squad-player-search-filters w-full' style={{ display: state.useSearchFilters ? 'block' : 'none' }}>
          <table className='w-full'>
            <tbody className='squad-attributes-stats-text'>
              <tr className='grid grid-cols-3 mb-1'>
                <td >league</td>
                <td>
                  <select
                    className='text-black'
                    name='league'
                    value={state.playerSearchFilters.league[0]}
                    onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, league: e.target.value })}
                  >
                    <option value=''>--</option>
                    {LEAGUES.map((league) => (
                      <option key={league} value={league}>{league}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>club</td>
                <td><select
                    className='text-black'
                    name='club'
                    value={state.playerSearchFilters.club[0]}
                    onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, club: e.target.value })}
                  >
                    <option value=''>--</option>
                    {state.playerSearchFilters.league.length > 1 &&
                    LEAGUE_CLUBS[state.playerSearchFilters.league].map((club) => (
                      <option key={club} value={club}>{club}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>nation</td>
                <td><select
                    className='text-black'
                    name='nation'
                    value={state.playerSearchFilters.nation[0]}
                    onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, nation: e.target.value })}
                  >
                    <option value=''>--</option>
                  {COMMON_NATIONS.map((nation) => (
                      <option key={nation} value={nation}>{nation}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>position</td>
                <td><select
                      className='text-black'
                      name='position'
                      value={state.playerSearchFilters.position[0]}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, position: e.target.value })}
                    >
                      <option value=''>--</option>
                    {POSITIONS.map((position) => (
                      <option key={position} value={position}>{position}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>rating</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minRating'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minRating}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minRating: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxRating'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxRating}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxRating: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>price</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minPrice'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minPrice}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minPrice: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxPrice'
                      className='text-black w-20'
                      value={state.playerSearchFilters.maxPrice}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxPrice: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>PAC</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minPAC'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minPAC}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minPAC: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxPAC'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxPAC}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxPAC: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>SHO</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minSHO'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minSHO}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minSHO: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxSHO'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxSHO}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxSHO: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>PAS</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minPAS'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minPAS}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minPAS: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxPAS'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxPAS}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxPAS: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>DRI</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minDRI'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minDRI}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minDRI: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxDRI'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxDRI}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxDRI: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>DEF</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minDEF'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minDEF}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minDEF: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxDEF'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxDEF}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxDEF: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>PHY</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minPHY'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minPHY}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minPHY: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxPHY'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxPHY}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxPHY: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>Skill Moves</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <select
                      className='text-black'
                      name='minSkillMoves'
                      value={state.playerSearchFilters.minSkillMoves}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minSkillMoves: e.target.value })}
                    >
                      {SKILL_MOVES.map((skillMove) => (
                        <option key={skillMove} value={skillMove}>{skillMove}</option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-row'>
                    max
                    <select
                      className='text-black'
                      name='maxSkillMoves'
                      value={state.playerSearchFilters.maxSkillMoves}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxSkillMoves: e.target.value })}
                    >
                      {SKILL_MOVES.map((skillMove) => (
                        <option key={skillMove} value={skillMove}>{skillMove}</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>Weak Foot</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <select
                      className='text-black'
                      name='minWeakFoot'
                      value={state.playerSearchFilters.minWeakFoot}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minWeakFoot: e.target.value })}
                    >
                      {WEAK_FOOT.map((weakFoot) => (
                        <option key={weakFoot} value={weakFoot}>{weakFoot}</option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-row'>
                    max
                    <select
                      className='text-black'
                      name='maxWeakFoot'
                      value={state.playerSearchFilters.maxWeakFoot}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxWeakFoot: e.target.value })}
                    >
                      {WEAK_FOOT.map((weakFoot) => (
                        <option key={weakFoot} value={weakFoot}>{weakFoot}</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              <tr className='grid grid-cols-3 mb-1'>
                <td>Height</td>
                <td className='flex flex-row'>
                  <div className='flex flex-row'>
                    min
                    <input
                      type='number'
                      name='minHeight'
                      className='text-black w-10'
                      value={state.playerSearchFilters.minHeight}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, minHeight: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-row'>
                    max
                    <input
                      type='number'
                      name='maxHeight'
                      className='text-black w-10'
                      value={state.playerSearchFilters.maxHeight}
                      onChange={(e) => setters.setPlayerSearchFilters({ ...state.playerSearchFilters, maxHeight: e.target.value })}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ul className='dropdown-list w-full' style={{ display: state.showDropdown ? 'block' : 'none' }}>
          {state.showDropdown &&
            state.dropdownPlayers.map((player, index) => (
              <li key={index} className="dropdown-item">
                <button
                  onClick={() => handleDropdownItemClick(player, stateSetters)}
                  className="dropdown-item-button"
                >
                  {player.name} - {player.rating}
                </button>
              </li>
            ))}
      </ul>  
    </div>
  )
}