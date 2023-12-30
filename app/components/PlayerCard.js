import Image from 'next/image'

import { determinePlayerNameFontSize } from '../../src/utils/font_util'
import { getPlayerLastName } from '../../src/utils/string_util'

export const PlayerCard = ({ player, size }) => {
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
        <p className="player-card-rating">{player.rating}</p>

        <Image src={player.imageUrl} width={8*size} height={8*size} alt='player image' />

        
      </div>
      <div className="px-8 flex flex-col" style={{ height: `${size*0.38}rem` }}>
        <p
          className='w-full text-center font-bold'
          style={{ fontSize: determinePlayerNameFontSize(getPlayerLastName(player.name)) }}
        >
          {getPlayerLastName(player.name)}
        </p>
        <div className='grid grid-cols-6 h-10/12'>
          <div className='player-card-attribute-div'>
            <p className='player-card-attribute-text'>PAC</p>
            <p className='player-card-attribute-value-text'>{player.PAC}</p>
          </div>
          <div className='player-card-attribute-div'>
            <p className='player-card-attribute-text'>SHO</p>
            <p className='player-card-attribute-value-text'>{player.SHO}</p>
          </div>
          <div className='player-card-attribute-div'>
            <p className='player-card-attribute-text'>PAS</p>
            <p className='player-card-attribute-value-text'>{player.PAS}</p>
          </div>
          <div className='player-card-attribute-div'>
            <p className='player-card-attribute-text'>DRI</p>
            <p className='player-card-attribute-value-text'>{player.DRI}</p>
          </div>
          <div className='player-card-attribute-div'>
            <p className='player-card-attribute-text'>DEF</p>
            <p className='player-card-attribute-value-text'>{player.DEF}</p>
          </div>
          <div className='player-card-attribute-div'>
            <p className='player-card-attribute-text'>PHY</p>
            <p className='player-card-attribute-value-text'>{player.PHY}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
