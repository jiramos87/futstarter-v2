import Image from 'next/image'

import { BsArrowUp, BsArrowDown, BsArrowRepeat } from 'react-icons/bs';

import { findSuggestionsToCompare, handleDropdownItemClick } from "../helper"
import { getPlayerLastName } from '../../../src/utils/string_util';

const getStatColor = (stat, selectePlayerStat) => {
  if (stat > selectePlayerStat) {
    return 'rgb(186, 237, 33)';
  } else if (stat < selectePlayerStat) {
    return 'rgb(3, 99, 38)';
  } else {
    return 'rgb(134, 145, 138)';
  }
}

const determineSuggestionPriceFontSize = (price) => {
  if (price > 1000000) {
    return '0.7rem'
  } else if (price > 100000) {
    return '0.8rem'
  } else if (price > 10000) {
    return '0.9rem'
  } else {
    return '1rem'
  }
}

const determinePlayerNameFontSize = (name) => {
  if (name.length > 10) {
    return '0.8rem'
  } else {
    return '1rem'
  }
}

export const PlayerSuggestionsCompare = ({ stateSetters }) => {
  const { state, setters } = stateSetters
  // const { suggestionCompareOrders } = state

  // const renderSortArrow = (attr) => {
  //   if (suggestionCompareOrders[attr] === 'asc') {
  //     return <BsArrowUp />
  //   } else if (suggestionCompareOrders[attr] === 'desc') {
  //     return <BsArrowDown />
  //   }
  // }
  return (
    <>
    {state.selectedPlayer && (
      <div>
        <h2>Suggestions for replacing {state.selectedPlayer.player.name}</h2>
        <div className='flex flex-row justify-start items-center'>
          <p>players</p>
          <select
            className="select-suggestion-compare-limit"
            onChange={(e) => setters.setSuggestionCompareLimit(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        
        <table className="player-suggestion-table">
          <thead className="player-suggestion-table-header">
            <tr className="player-suggestion-table-header-row">
              <th className="player-suggestion-table-header-cell"></th>
              <th className="player-suggestion-table-header-cell"></th>
              <th className="player-suggestion-table-header-name-cell">Name</th>
              <th className="player-suggestion-table-header-cell">OVR</th>
              <th className="player-suggestion-table-header-cell">PAC</th>
              <th className="player-suggestion-table-header-cell">SHO</th>
              <th className="player-suggestion-table-header-cell">PAS</th>
              <th className="player-suggestion-table-header-cell">DRI</th>
              <th className="player-suggestion-table-header-cell">DEF</th>
              <th className="player-suggestion-table-header-cell">PHY</th>
              <th className="player-suggestion-table-header-cell-price">Price</th>
            </tr>
          </thead>
          <tbody>
              <tr className="player-suggestion-table-row">
                <td className="exchange-icon-cell"></td>
                <td className="exchange-icon-cell flex flex-col justify-center items-center">
                  <Image src={state.selectedPlayer.player.nationImageUrl} width={32} height={32} alt='player image' />
                </td>
                <td className="player-suggestion-table-name-cell">
                  <div className="flex flex-row items-center">
                    <Image src={state.selectedPlayer.player.imageUrl} width={32} height={32} alt='player image' />
                    <div style={{ fontSize: determinePlayerNameFontSize(getPlayerLastName(state.selectedPlayer.player.name))}}>
                      {getPlayerLastName(state.selectedPlayer.player.name)}
                    </div>
                  </div>
                </td>
                <td className="player-suggestion-table-cell">{state.selectedPlayer.player.rating}</td>
                <td className="player-suggestion-table-cell">{state.selectedPlayer.player.PAC}</td>
                <td className="player-suggestion-table-cell">{state.selectedPlayer.player.SHO}</td>
                <td className="player-suggestion-table-cell">{state.selectedPlayer.player.PAS}</td>
                <td className="player-suggestion-table-cell">{state.selectedPlayer.player.DRI}</td>
                <td className="player-suggestion-table-cell">{state.selectedPlayer.player.DEF}</td>
                <td className="player-suggestion-table-cell">{state.selectedPlayer.player.PHY}</td>
                <td className="player-suggestion-table-cell-price" style={{ fontSize: determineSuggestionPriceFontSize(state.selectedPlayer.player.price)}}>{state.selectedPlayer.player.price}</td>
              </tr>
            </tbody>
        </table>
        <table className="player-suggestion-table">
          <thead className="player-suggestion-table-header">
            <tr className="player-suggestion-table-header-row">
              <th className="player-suggestion-table-header-cell"></th>
              <th className="player-suggestion-table-header-cell"></th>
              <th 
                className="player-suggestion-table-header-name-cell"
                onClick={() => findSuggestionsToCompare('name', stateSetters)}
              >
                Name
              </th>
              <th 
                className="player-suggestion-table-header-cell"
                onClick={() => findSuggestionsToCompare('rating', stateSetters)}
              >
                OVR
              </th>
              <th 
                className="player-suggestion-table-header-cell"
                onClick={() => findSuggestionsToCompare('PAC', stateSetters)}
              >
                PAC
              </th>
              <th 
                className="player-suggestion-table-header-cell"
                onClick={() => findSuggestionsToCompare('SHO', stateSetters)}
              >
                SHO
              </th>
              <th 
                className="player-suggestion-table-header-cell"
                onClick={() => findSuggestionsToCompare('PAS', stateSetters)}
              >
                PAS
              </th>
              <th 
                className="player-suggestion-table-header-cell"
                onClick={() => findSuggestionsToCompare('DRI', stateSetters)}
              >
                DRI
              </th>
              <th 
                className="player-suggestion-table-header-cell"
                onClick={() => findSuggestionsToCompare('DEF', stateSetters)}
              >
                DEF
              </th>
              <th 
                className="player-suggestion-table-header-cell"
                onClick={() => findSuggestionsToCompare('PHY', stateSetters)}
              >
                PHY
              </th>
              <th
                className="player-suggestion-table-header-cell-price"
                onClick={() => findSuggestionsToCompare('price', stateSetters)}
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {state.suggestionCompareList.map((player, key) => (
              <tr key={key} className="player-suggestion-table-row">
                <td className="exchange-icon-cell">
                  <button
                    className="exchange-button"
                    onClick={() => handleDropdownItemClick(player, stateSetters)}
                  >
                    <BsArrowRepeat size={17} />
                  </button>
                </td>
                <td className="exchange-icon-cell flex flex-col justify-center items-center">
                  <Image src={player.nationImageUrl} width={32} height={32} alt='player image' />
                </td>
                <td className="player-suggestion-table-name-cell">
                  <div className="flex flex-row items-center">
                    <Image src={player.imageUrl} width={32} height={32} alt='player image' />
                    <div style={{ fontSize: determinePlayerNameFontSize(getPlayerLastName(player.name))}}>
                      {getPlayerLastName(player.name)}
                    </div>
                  </div>
                </td>
                <td className="player-suggestion-table-cell" style={{ color: getStatColor(player.rating, state.selectedPlayer.player.rating)}}><>{player.rating}</></td>
                <td className="player-suggestion-table-cell" style={{ color: getStatColor(player.PAC, state.selectedPlayer.player.PAC)}}>{player.PAC}</td>
                <td className="player-suggestion-table-cell" style={{ color: getStatColor(player.SHO, state.selectedPlayer.player.SHO)}}>{player.SHO}</td>
                <td className="player-suggestion-table-cell" style={{ color: getStatColor(player.PAS, state.selectedPlayer.player.PAS)}}>{player.PAS}</td>
                <td className="player-suggestion-table-cell" style={{ color: getStatColor(player.DRI, state.selectedPlayer.player.DRI)}}>{player.DRI}</td>
                <td className="player-suggestion-table-cell" style={{ color: getStatColor(player.DEF, state.selectedPlayer.player.DEF)}}>{player.DEF}</td>
                <td className="player-suggestion-table-cell" style={{ color: getStatColor(player.PHY, state.selectedPlayer.player.PHY)}}>{player.PHY}</td>
                <td className="player-suggestion-table-cell-price" style={{ color: getStatColor(player.price, state.selectedPlayer.player.price), fontSize: determineSuggestionPriceFontSize(player.price)}}>{player.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    </>
    
  )
}
