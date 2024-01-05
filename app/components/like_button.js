'use client'
 
import { useState } from 'react'

import { paleBlueButtonWithDarkBlueTextStyle } from '../styles/button_styles'

const LikeButton = () => {
  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }
 
  return (
    <button
      className={paleBlueButtonWithDarkBlueTextStyle}
      onClick={handleClick}>
        👍 Like ({likes})
    </button>
  )
}

export default LikeButton
