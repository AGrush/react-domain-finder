import React from 'react'
import ControlPanel from './app/ControlPanel';
import Results from './app/Results'
import Header from './app/Header'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <ControlPanel />
      <Results />
    </React.Fragment>
  )
}

export default App;

