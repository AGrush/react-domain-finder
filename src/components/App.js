import React from 'react'
import ControlPanel from './App/ControlPanel';
import Results from './App/Results'
import Header from './App/Header'

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

