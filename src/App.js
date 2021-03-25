import React, {useState} from 'react'
import './App.css'
import SnakeBoard from './SnakeBoard'
import Points from './Points'

function App() {
  const [points, setPoints] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        Matopeli
      </header>
      <div className='Game'>
        <Points points={points} />
        <SnakeBoard points={points} setPoints={setPoints} />
      </div>
    </div>
  )
}

export default App
