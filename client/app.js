import React from 'react'
import {BuildingInfo} from './components/BuildingInfo'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <BuildingInfo />
      <Routes />
    </div>
  )
}

export default App
