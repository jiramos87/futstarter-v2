'use client'

import { FaLightbulb } from 'react-icons/fa'

import MainLayout from '../layouts/main_layout'
import { SQUAD_FORMATIONS_POSITIONS } from '../../src/constants/formations'
import { RadarChart } from '../components/radar_chart'
import {
  COMMON_NATIONS,
  LEAGUES,
  LEAGUE_CLUBS,
  POSITIONS,
  SKILL_MOVES,
  WEAK_FOOT
} from '../../src/constants/player_search_filters'
import { determineFontSize } from '../../src/utils/font_util'

import { useSquadBuilderState } from './state'
import {
  handlePlayerSearchChange,
  handlePositionSelection,
  toggleUseSearchFilters,
  handleSeePlayerDetailsClick,
  handleSaveSquadClick,
  handleLoadSquadClick,
  handleLoadSquad,
  handleSuggestionClick,
  handleRemovePlayer,
  handleDropdownItemClick,
  handleCompareToClick,
  prepareRadarChartData,
} from './helper'
import { useSquadBuilderEffects } from './effect'

const SquadBuilderPage = () => {
  const stateSetters = useSquadBuilderState()
  useSquadBuilderEffects(stateSetters)
  const { state, setters } = stateSetters

  return (
    <MainLayout>
      <div className="flex h-full">
        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {state.user && (
            <>
              <div className="flex-1 p-1" style={{ height: '50%'}}>
                <div className="flex flex-row mb-1 align-center justify-around" style={{ height: '10%' }}>
                  <div className="flex flex-row bg-gray-800 text-white rounded-md p-2">
                    POS: {state.selectedPosition}
                  </div>
                  <input
                    type="text"
                    name="playerName"
                    value={state.playerSearchString}
                    onChange={(e) => handlePlayerSearchChange(e, stateSetters)}
                    placeholder="Search Player"
                    className="border border-gray-700 rounded-md w-8/12 bg-gray-800 text-white p-2"
                  />
                </div>

                <ul className='dropdown-list' style={{ display: state.showDropdown ? 'block' : 'none' }}>
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
                <div className="flex flex-col" style={{ height: '90%' }}>
                  <div style={{ height: '10%' }}>
                    <input
                      type='checkbox'
                      id='use-search-filters'
                      name='use-search-filters'
                      className='mr-2'
                      onClick={() => toggleUseSearchFilters(stateSetters)}
                    />
                    <label htmlFor='use-search-filters' className='ml-2'>Use search filters</label>
                  </div>
                  <div className='border rounded-md p-2 my-1 h-full squad-player-search-filters' style={{ display: state.useSearchFilters ? 'block' : 'none', backgroundColor: '#111457', height: '90%' }}>
                    <table className='w-full'>
                      <tbody className='squad-attributes-stats-text'>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>league</td>
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
                        <tr className='grid grid-cols-2 mb-1'>
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
                        <tr className='grid grid-cols-2 mb-1'>
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
                        <tr className='grid grid-cols-2 mb-1'>
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
                        <tr className='grid grid-cols-2 mb-1'>
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
                        <tr className='grid grid-cols-2 mb-1'>
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
                        <tr className='grid grid-cols-2 mb-1'>
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
                        <tr className='grid grid-cols-2 mb-1'>
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
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxSHO: e.target.value })}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>PAS</td>
                          <td className='flex flex-row'>
                            <div className='flex flex-row'>
                              min
                              <input
                                type='number'
                                name='minPAS'
                                className='text-black w-10'
                                value={state.playerSearchFilters.minPAS}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, minPAS: e.target.value })}
                              />
                            </div>
                            <div className='flex flex-row'>
                              max
                              <input
                                type='number'
                                name='maxPAS'
                                className='text-black w-10'
                                value={state.playerSearchFilters.maxPAS}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxPAS: e.target.value })}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>DRI</td>
                          <td className='flex flex-row'>
                            <div className='flex flex-row'>
                              min
                              <input
                                type='number'
                                name='minDRI'
                                className='text-black w-10'
                                value={state.playerSearchFilters.minDRI}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, minDRI: e.target.value })}
                              />
                            </div>
                            <div className='flex flex-row'>
                              max
                              <input
                                type='number'
                                name='maxDRI'
                                className='text-black w-10'
                                value={state.playerSearchFilters.maxDRI}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxDRI: e.target.value })}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>DEF</td>
                          <td className='flex flex-row'>
                            <div className='flex flex-row'>
                              min
                              <input
                                type='number'
                                name='minDEF'
                                className='text-black w-10'
                                value={state.playerSearchFilters.minDEF}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, minDEF: e.target.value })}
                              />
                            </div>
                            <div className='flex flex-row'>
                              max
                              <input
                                type='number'
                                name='maxDEF'
                                className='text-black w-10'
                                value={state.playerSearchFilters.maxDEF}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxDEF: e.target.value })}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>PHY</td>
                          <td className='flex flex-row'>
                            <div className='flex flex-row'>
                              min
                              <input
                                type='number'
                                name='minPHY'
                                className='text-black w-10'
                                value={state.playerSearchFilters.minPHY}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, minPHY: e.target.value })}
                              />
                            </div>
                            <div className='flex flex-row'>
                              max
                              <input
                                type='number'
                                name='maxPHY'
                                className='text-black w-10'
                                value={state.playerSearchFilters.maxPHY}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxPHY: e.target.value })}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>Skill Moves</td>
                          <td className='flex flex-row'>
                            <div className='flex flex-row'>
                              min
                              <select
                                className='text-black'
                                name='minSkillMoves'
                                value={state.playerSearchFilters.minSkillMoves}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, minSkillMoves: e.target.value })}
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
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxSkillMoves: e.target.value })}
                              >
                                {SKILL_MOVES.map((skillMove) => (
                                  <option key={skillMove} value={skillMove}>{skillMove}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>Weak Foot</td>
                          <td className='flex flex-row'>
                            <div className='flex flex-row'>
                              min
                              <select
                                className='text-black'
                                name='minWeakFoot'
                                value={state.playerSearchFilters.minWeakFoot}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, minWeakFoot: e.target.value })}
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
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxWeakFoot: e.target.value })}
                              >
                                {WEAK_FOOT.map((weakFoot) => (
                                  <option key={weakFoot} value={weakFoot}>{weakFoot}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                        <tr className='grid grid-cols-2 mb-1'>
                          <td>Height</td>
                          <td className='flex flex-row'>
                            <div className='flex flex-row'>
                              min
                              <input
                                type='number'
                                name='minHeight'
                                className='text-black w-10'
                                value={state.playerSearchFilters.minHeight}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, minHeight: e.target.value })}
                              />
                            </div>
                            <div className='flex flex-row'>
                              max
                              <input
                                type='number'
                                name='maxHeight'
                                className='text-black w-10'
                                value={state.playerSearchFilters.maxHeight}
                                onChange={(e) => setter.setPlayerSearchFilters({ ...state.playerSearchFilters, maxHeight: e.target.value })}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>    
              </div>
              
              <div className="flex-1 p-4 rounded-md" style={{ height: '50%', backgroundColor: '#111457' }}>
                {state.selectedPlayer && state.playerToCompare
                  ? (
                  <div>
                    {/* RadarChart component */}
                    <RadarChart radarData={prepareRadarChartData(state.selectedPlayer, state.playerToCompare)}/>
                  </div>
                ): (
                  state.selectedPlayer && (
                <div className="flex flex-col items-center mb-2 squad-attributes-stats-text">
                  <div className='flex flex-row items-center mb-2 justify-between w-full'>
                    <div className='flex flex-col justify-center items-center' style={{ width: '30%' }}>
                      <div className='squad-player-big-rating'>{state.selectedPlayer.rating}</div>
                      <div className='squad-player-big-position'>{state.selectedPlayer.mainPosition}</div>
                      <div>{state.selectedPlayer.secondaryPositions}</div>
                    </div>
                    <div className='flex flex-col justify-center items-center' style={{ width: '70%' }}>
                      <div className='squad-div-title-text'>{state.selectedPlayer.name}</div>
                      <div className='flex flex-row justify-between'>
                        <div>{state.selectedPlayer.nation}</div>
                        <div>{state.selectedPlayer.club}</div>
                        <div>{state.selectedPlayer.league}</div>
                      </div>
                    </div>
                  </div>
                  <table className="w-full mb-4">
                    <tbody>
                      <tr>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">Skill Moves</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.skillMoves}</div>
                            <div className="squad-attributes-stats-text">Weak Foot</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.weakFoot}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">Att WR</div> 
                            <div className="squad-attributes-stats">{state.selectedPlayer.attackWorkRate}</div>
                            <div className="squad-attributes-stats-text">Def WR</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.defenseWorkRate}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">Height</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.height}</div>
                            <div className="squad-attributes-stats-text">Weight</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.weight}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">PAC</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.PAC}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">SHO</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.SHO}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">PAS</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.PAS}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">DRI</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.DRI}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">DEF</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.DEF}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-center">
                            <div className="squad-attributes-stats-text">PHY</div>
                            <div className="squad-attributes-stats">{state.selectedPlayer.PHY}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                ))}
                {state.selectedPlayer && (
                  <div className='mt-10'>
                    <button
                      className="relative top-0 right-0 mr-2 mt-2 bg-blue-600 text-white px-2 py-1 rounded-md"
                      onClick={() => handleCompareToClick(document, stateSetters)}
                    >
                      Compare to
                    </button>
                    <button
                      className="relative top-0 right-0 mr-2 mt-2 bg-blue-600 text-white px-2 py-1 rounded-md"
                      onClick={() => handleSeePlayerDetailsClick(stateSetters)}
                    >
                      Player details
                    </button>
                    
                  </div>
                )}
              </div>
            </>
          )}
          {!state.user && (
            <div>
              <h1 className="text-5xl">Welcome to Futstarter ⚽</h1>
              <h2 className="text-3xl">Please login to continue</h2>
            </div>
          )}
        </div>
        <div className="flex-2 bg-blue-900 relative" style={{ flexBasis: '50%' }}>
          <div
            className="bg-center bg-no-repeat bg-contain h-full"
            style={{ backgroundImage: `url('/football-pitch.jpg')` }}
          >
            {state.user && (
            <>
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
                  <div className="card-container" style={{ width: '5rem', height: '6rem', position: 'relative' }}>
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
        </div>
        <div className="flex-1 bg-blue-900 p-4" style={{ flexBasis: '25%', color: 'white' }}>
          {state.user && (
            <>
              <div style={{ height: '30%' }}>
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
                    className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white mt-4"
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
                    onChange={(e) => setSquadName(e.target.value)}
                    className="border border-gray-700 rounded-md px-3 py-2 w-full bg-gray-800 text-white"
                  />
                </div>
                <div className="mt-4 flex">
                  <div className="formation-div" style={{ width: '60%' }}>
                    <h1 className="text-lg mb-2">Formation</h1>
                    <select
                      name="formation"
                      value={state.formation}
                      onChange={(e) => setFormation(e.target.value)}
                      className="border border-gray-700 rounded-md px-3 py-2 w-75 bg-gray-800 text-white"
                    >
                      {Object.keys(SQUAD_FORMATIONS_POSITIONS).map((formation) => (
                        <option key={formation} value={formation}>
                          {formation}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="rating-div " style={{ width: '40%' }}>
                    <h1 className="text-lg mb-2">Squad Rating</h1>
                    <p className='text-2xl flex flex-row justify-center items-center'>{state.squadRatings.average}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start pt-1 px-2 rounded" style={{ height: '70%', backgroundColor: '#111457' }}>
                <div>
                  <div className="flex flex-row squad-div-title-text justify-center">Squad Attributes</div>
                </div>
                <table className="w-full">
                  <tbody>
                    {/* General */}
                    <tr>
                      <td colSpan="3" className="squad-attribute-type-text mt-2 mb-2">General</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex flex-col items-center">
                          <div className="squad-attributes-stats-text">Skill Moves</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.generalSkillMoves}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center">
                          <div className="squad-attributes-stats-text">Weak Foot</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.generalWeakFoot}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center">
                          <div className="squad-attributes-stats-text">Height</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.generalHeight} cm</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex flex-col items-center">
                          <div className="squad-attributes-stats-text">Att WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.generalAttWorkRate}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center">
                          <div className="squad-attributes-stats-text">Def WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.generalDefWorkRate}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="squad-attribute-type-text mt-2 mb-2">Clubs</td>
                      <td className="squad-attribute-type-text mt-2 mb-2">Leagues</td>
                      <td className="squad-attribute-type-text mt-2 mb-2">Nations</td>
                    </tr>
                    <tr className="text-sm">
                      <td>
                        <div className="flex flex-col items-center">
                          {Object.keys(state.squadAttributes.clubs).map((club) => (
                            <div className="squad-attributes-stats-text" key={club}>{club}: {state.squadAttributes.clubs[club]}</div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center">
                          {Object.keys(state.squadAttributes.leagues).map((league) => (
                            <div className="squad-attributes-stats-text" key={league}>{league}: {state.squadAttributes.leagues[league]}</div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center">
                          {Object.keys(state.squadAttributes.nations).map((nation) => (
                            <div className="squad-attributes-stats-text" key={nation}>{nation}: {state.squadAttributes.nations[nation]}</div>
                          ))}
                        </div>
                      </td>
                    </tr>

                    {/* Positional */}
                    <tr>
                      <td colSpan="3" className="squad-attribute-type-text mt-2 mb-2">Positional</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex flex-col items-center">
                          {/* ATT Data */}
                          <div className="text-sm">ATT</div>
                          <div className="squad-attributes-stats-text">Skill Moves</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.skillMoves}</div>
                          <div className="squad-attributes-stats-text">Weak Foot</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.weakFoot}</div>
                          <div className="squad-attributes-stats-text">Att WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.attWorkRate}</div>
                          <div className="squad-attributes-stats-text">Def WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.ATT.defWorkRate}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center">
                          {/* MID Data */}
                          <div className="text-sm">MID</div>
                          <div className="squad-attributes-stats-text">Skill Moves</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.skillMoves}</div>
                          <div className="squad-attributes-stats-text">Weak Foot</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.weakFoot}</div>
                          <div className="squad-attributes-stats-text">Att WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.attWorkRate}</div>
                          <div className="squad-attributes-stats-text">Def WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.MID.defWorkRate}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-center">
                          {/* DEF Data */}
                          <div className="text-sm">DEF</div>
                          <div className="squad-attributes-stats-text">Skill Moves</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.skillMoves}</div>
                          <div className="squad-attributes-stats-text">Weak Foot</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.weakFoot}</div>
                          <div className="squad-attributes-stats-text">Att WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.attWorkRate}</div>
                          <div className="squad-attributes-stats-text">Def WR</div>
                          <div className="squad-attributes-stats">{state.squadAttributes.positional.DEF.defWorkRate}</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default SquadBuilderPage
