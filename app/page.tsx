import Image from 'next/image'

import LikeButton from './components/like_button'
import { comingFeatureNames } from '../src/constants/features'
import { mediumSizeTextListStyle } from './styles/list_styles'
import { bigSubtitleStyle, veryBigHeaderStyle } from './styles/text_styles'
import NavLinks from './components/nav_links'
import NavHeader from './components/nav_header'

interface HeaderProps {
  title?: string
}

interface SubtitleProps {
  subtitle?: string
}

const Header = ({ title }: HeaderProps): JSX.Element => {
  return <h1 className={veryBigHeaderStyle}>{title ? title : "Default title"}</h1>
}

const Subtitle = ({ subtitle }: SubtitleProps): JSX.Element => {
  return <h2 className={bigSubtitleStyle}>{subtitle ? subtitle : "Default subtitle"}</h2>
}

const VerticalNav = (): JSX.Element => {
  return (
    <nav className="bg-blue-900 w-1/6 p-4">
      <div className="my-8">
        <NavHeader />
      </div>
      <div className="my-8">
        <ul>
          <NavLinks />
        </ul>
      </div>
      
    </nav>
  )
}

const MainWindow = (): JSX.Element => {
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
          {comingFeatureNames.map((name: string) => (
            <li key={name}>{'<' + name + '>'}</li>
          ))}
        </ul>

        <LikeButton />
      </div>
    </div>
  )
}

const HomePage = (): JSX.Element => {
  return (
    <div className="flex min-h-screen">
      <VerticalNav />
      <div className="w-5/6">
        <MainWindow />
      </div>
    </div>
  )
}

export default HomePage
