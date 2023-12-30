'use client'

import { bigSubtitleStyle, veryBigHeaderStyle } from './styles/text_styles'
import MainLayout from './layouts/main_layout'

const Header = ({ title }) => {
  return <h1 className={veryBigHeaderStyle}>{title ? title : "Default title"}</h1>
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
      >
      </div>
      <div className="z-10">
        <Header title="Welcome to the Futstarter Squad Builder" />
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex min-h-screen">
        <div className="w-full">
          
          <MainWindow />
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
