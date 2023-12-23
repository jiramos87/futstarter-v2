export const PlayerBasicStats = ({ stateSetters }) => {
  const { state } = stateSetters
  return (
    <div className="flex flex-col items-center mb-2 squad-attributes-stats-text">
      <div className='flex flex-row items-center mb-2 justify-between w-full'>
        <div className='flex flex-col justify-center items-center' style={{ width: '70%' }}>
          <div className='squad-div-title-text'>{state.selectedPlayer.name}</div>
          <div className='flex flex-row justify-between'>
            <div>{state.selectedPlayer.nation}</div>
            <div>{state.selectedPlayer.club}</div>
            <div>{state.selectedPlayer.league}</div>
          </div>
        </div>
        <div className='flex flex-col items-center' style={{ width: '30%' }}>
          <div className='squad-player-big-rating'>{state.selectedPlayer.rating}</div>
          <div className='squad-player-big-position'>{state.selectedPlayer.mainPosition}</div>
          <div>{state.selectedPlayer.secondaryPositions}</div>
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
  )
}
