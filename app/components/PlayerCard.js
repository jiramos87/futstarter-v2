import Image from 'next/image'

import { determinePlayerNameFontSize } from '../../src/utils/font_util'
import { getPlayerLastName } from '../../src/utils/string_util'
import { parsePlayerPosition } from '../../src/helpers/player'

export const PlayerCard = ({ selectedPlayer, size }) => {
  const { player, POS } = selectedPlayer

  const cardWidth = size
  const cardHeight = size * 1.2
  return (
    <div
      className="player-card"
      style={{
        width: `${cardWidth}rem`,
        height: `${cardWidth}rem`,
        position: 'relative',
        overflow: 'visible',
        backgroundImage: "url('/gold-card.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }}
    >
      <div className='flex flex-col justify-end' style={{ height: `${cardHeight*0.62}rem` }}>
        <div className='player-card-rating-position'>
          <p className="player-card-rating">{player.rating}</p>
          <p className="player-card-position">{parsePlayerPosition(POS)}</p>
        </div>
        

        <Image src={player.imageUrl} width={8*size} height={8*size} alt='player image' />

        
      </div>
      <div className="px-8 flex flex-col justify-center items-center" style={{ height: `${size*0.38}rem` }}>
        <div className="player-card-bottom-data w-7/12">
          <p
            className='w-full text-center font-bold mb-1'
            style={{ fontSize: determinePlayerNameFontSize(getPlayerLastName(player.name)) }}
          >
            {getPlayerLastName(player.name)}
          </p>
          <div className='grid grid-cols-6 h-10/12 w-full'>
            <div className='player-card-attribute-div col-1'>
              <p className='player-card-attribute-text'>PAC</p>
              <p className='player-card-attribute-value-text'>{player.PAC}</p>
            </div>
            <div className='player-card-attribute-div col-1'>
              <p className='player-card-attribute-text'>SHO</p>
              <p className='player-card-attribute-value-text'>{player.SHO}</p>
            </div>
            <div className='player-card-attribute-div col-1'>
              <p className='player-card-attribute-text'>PAS</p>
              <p className='player-card-attribute-value-text'>{player.PAS}</p>
            </div>
            <div className='player-card-attribute-div col-1'>
              <p className='player-card-attribute-text'>DRI</p>
              <p className='player-card-attribute-value-text'>{player.DRI}</p>
            </div>
            <div className='player-card-attribute-div col-1'>
              <p className='player-card-attribute-text'>DEF</p>
              <p className='player-card-attribute-value-text'>{player.DEF}</p>
            </div>
            <div className='player-card-attribute-div col-1'>
              <p className='player-card-attribute-text'>PHY</p>
              <p className='player-card-attribute-value-text'>{player.PHY}</p>
            </div>
          </div>
          <div className='player-card-nation-club-league-div'>
            <Image src={player.nationImageUrl} width={1.5*size} height={1.5*size} alt='player nation image' />
            <Image src={player.leagueImageUrl} width={1.5*size} height={1.5*size} alt='player league image' />
            <Image src={player.clubImageUrl} width={1.5*size} height={1.5*size} alt='player club image' />
          </div>
        </div>
       
      </div>
    </div>
  )
}
