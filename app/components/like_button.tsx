'use client'
 
import { useState } from 'react'

import { paleBlueButtonWithDarkBlueTextStyle } from '../styles/button_styles'

export default function LikeButton(): JSX.Element {
  const [likes, setLikes] = useState<number>(0)

  function handleClick() {
    setLikes(likes + 1)
  }
 
  return <button
    className={paleBlueButtonWithDarkBlueTextStyle}
    onClick={handleClick}>
      👍 Like ({likes})
  </button>
}
