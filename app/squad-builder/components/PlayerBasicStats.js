export const PlayerBasicStats = ({ stateSetters }) => {
  const { state } = stateSetters
  const { player } = state.selectedPlayer

  return (
    <div className="flex flex-col items-center mb-2 squad-attributes-stats-text">
      <div className='flex flex-row items-center mb-2 justify-between w-full'>
        <div className='flex flex-col justify-center items-center' style={{ width: '70%' }}>
          <div className='squad-div-title-text'>{player.name}</div>
          <div className='flex flex-row justify-between'>
            <div>{player.nation}</div>
            <div>{player.club}</div>
            <div>{player.league}</div>
          </div>
        </div>
        <div className='flex flex-col items-center' style={{ width: '30%' }}>
          <div className='squad-player-big-rating'>{player.rating}</div>
          <div className='squad-player-big-position'>{player.mainPosition}</div>
          <div>{player.secondaryPositions}</div>
        </div>
      </div>
      <table className="w-full mb-4">
        <tbody>
          <tr>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Skill Moves</div>
                <div className="squad-attributes-stats">{player.skillMoves}</div>
                <div className="squad-attributes-stats-text">Weak Foot</div>
                <div className="squad-attributes-stats">{player.weakFoot}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Att WR</div> 
                <div className="squad-attributes-stats">{player.attackWorkRate}</div>
                <div className="squad-attributes-stats-text">Def WR</div>
                <div className="squad-attributes-stats">{player.defenseWorkRate}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">Height</div>
                <div className="squad-attributes-stats">{player.height}</div>
                <div className="squad-attributes-stats-text">Weight</div>
                <div className="squad-attributes-stats">{player.weight}</div>
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
                <div className="squad-attributes-stats">{player.PAC}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">SHO</div>
                <div className="squad-attributes-stats">{player.SHO}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">PAS</div>
                <div className="squad-attributes-stats">{player.PAS}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">DRI</div>
                <div className="squad-attributes-stats">{player.DRI}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">DEF</div>
                <div className="squad-attributes-stats">{player.DEF}</div>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center">
                <div className="squad-attributes-stats-text">PHY</div>
                <div className="squad-attributes-stats">{player.PHY}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
