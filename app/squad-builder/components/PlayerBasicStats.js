import Image from 'next/image'

export const PlayerBasicStats = ({ stateSetters }) => {
  const { state } = stateSetters
  const { player } = state.selectedPlayer

  return (
    <>
    {player && (
      <div className="flex flex-col mb-2 squad-attributes-stats-text justify-center items-center">
        <div className="player-basic-stats-presentation-card flex flex-col">
          <div className='flex flex-row justify-center'>
            <div className='flex flex-col justify-center items-center' style={{ width: '75%' }}>
              <div>
                <Image src={player.imageUrl} width={160} height={160} alt='player image' />
              </div>
            </div>
            <div className='flex flex-col items-center justify-center' style={{ width: '25%' }}>
              <div className='squad-player-big-rating'>{player.rating}</div>
              <div className='squad-player-big-position'>{player.mainPosition}</div>
              <div className='squad-player-secondary-position'>{player.secondaryPositions}</div>
            </div>
          </div>
          <div className='squad-div-title'>
            {player.name}
          </div>
          <div className='flex flex-row justify-center'>
            <div className='player-basic-stats-logos'>
              <Image src={player.nationImageUrl} width={32} height={32} alt='player nation image' />
              {player.nation}
            </div>
            <div className='player-basic-stats-logos'>
              <Image src={player.clubImageUrl} width={32} height={32} alt='player club image' />
              {player.club}
            </div>
            <div className='player-basic-stats-logos'>
              <Image src={player.leagueImageUrl} width={32} height={32} alt='player league image' />
              {player.league}
            </div>
          </div>
        </div>
        
        <table className="w-full my-4">
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
    )}
    </>
  )
}
