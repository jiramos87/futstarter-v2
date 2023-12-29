import Image from 'next/image'

import { determineFontSize } from '../../src/utils/font_util'

export const PlayerCard = ({ player, size }) => {
  const cardWidth = size
  const cardHeight = size * 1.2
  return (
    <div
      className="player-card flex flex-col items-center justify-center"
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
      <div style={{ height: `${cardHeight*0.55}rem` }}>
        <p className="text-xl">{player.rating}</p>
        <Image src={player.imageUrl} width={8*size} height={8*size} alt='player image' />
      </div>
      <div style={{ height: `${size*0.45}rem` }}>
        <p
          className='w-full text-center'
          style={{ fontSize: determineFontSize(player.name) }}
        >
          {player.name}
        </p>
      </div>
    </div>
  )
}
