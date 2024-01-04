import Image from 'next/image'
import { StarRating } from '../../components/Stars'

const determinePlayerLogoAttributeFontSize = (attribute) => {
  if (attribute.length > 10) {
    return '0.7rem'
  } else {
    return '0.9rem'
  }
}

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
          <div className='grid grid-cols-3'>
            <div className='player-basic-stats-logos' style={{ fontSize: determinePlayerLogoAttributeFontSize(player.nation)}}>
              <Image src={player.nationImageUrl} width={32} height={32} alt='player nation image' />
              {player.nation}
            </div>
            <div className='player-basic-stats-logos' style={{ fontSize: determinePlayerLogoAttributeFontSize(player.club) }}>
              <Image src={player.clubImageUrl} width={32} height={32} alt='player club image' />
              {player.club}
            </div>
            <div className='player-basic-stats-logos' style={{ fontSize: determinePlayerLogoAttributeFontSize(player.league) }}>
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
                <div className="squad-attributes-stats-text">SKILL MOVES</div>
                <StarRating value={player.skillMoves} />
                <div className="squad-attributes-stats-text">WEAK FOOT</div>
                <StarRating value={player.weakFoot} />
              </div>
              </td>
              <td>
                <div className="flex flex-col items-center">
                  <div className="squad-attributes-stats-text">ATT WR</div> 
                  <div className="squad-attributes-stats">{player.attackWorkRate}</div>
                  <div className="squad-attributes-stats-text">DEF WR</div>
                  <div className="squad-attributes-stats">{player.defenseWorkRate}</div>
                </div>
              </td>
              <td>
                <div className="flex flex-col items-center">
                  <div className="squad-attributes-stats-text">HEIGHT</div>
                  <div className="squad-attributes-stats">{player.height}</div>
                  <div className="squad-attributes-stats-text">WEIGHT</div>
                  <div className="squad-attributes-stats">{player.weight} kg</div>
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
