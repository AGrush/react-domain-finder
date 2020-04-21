import React from 'react'
import ControlPanel from './ControlPanel';
import Results from './Results'
import Header from './Header'

const App = () => {
  return (
    <div>
      <Header />
      <ControlPanel />
      <br />
      <Results />
    </div>
  )
}

export default App;

