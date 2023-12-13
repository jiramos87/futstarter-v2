'use client'

import { comingFeatureNames } from '../src/constants/features'

import LikeButton from './components/like_button'
import { mediumSizeTextListStyle } from './styles/list_styles'
import { bigSubtitleStyle, veryBigHeaderStyle } from './styles/text_styles'
import MainLayout from './layouts/main_layout'

const Header = ({ title }) => {
  return <h1 className={veryBigHeaderStyle}>{title ? title : "Default title"}</h1>
}

const Subtitle = ({ subtitle }) => {
  return <h2 className={bigSubtitleStyle}>{subtitle ? subtitle : "Default subtitle"}</h2>
}

const MainWindow = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div
        className="absolute inset-0 z-0 filter blur-xs"
        style={{
          backgroundImage: `url('/ronaldinho_1.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="z-10 relative">
        <Header title="Welcome to Futstarter ⚽" />
        <Subtitle subtitle="We are working on the following features:" />
        <ul className={mediumSizeTextListStyle}>
          {comingFeatureNames.map((name) => (
            <li key={name}>{'<' + name + '>'}</li>
          ))}
        </ul>

        <LikeButton />
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex min-h-screen">
        <div className="w-5/6">
          <MainWindow />
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
