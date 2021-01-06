import React, {useState} from 'react'
import './SnakeBoard.css'

const SnakeBoard = () => {
  /*
  initialRows on kaksiulotteinen array eli taulukko
  alustettuna pelkillä tyhjillä arvoilla 'blank'
  0 : (10) ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank']
  1 : (10) ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank']
  2 : (10) ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank']
  ...
  */
  const height = 10
  const width = 10
  var initialRows = []
  for (var i = 0; i < height; i++) {
    initialRows[i] = []
    for (var j = 0; j < width; j++) {
      initialRows[i][j] = 'blank'
    }
  }

  /*
  Reactin statea voi käyttää Hookien avulla myös tällaisissa luokattomissa
  komponenteissa. https://joinex.fi/react-pahkinankuoressa/
  */
  // Rows eli rivit merkitsee tässä pelilaudan rivejä
  const [rows, setRows] = useState(initialRows)

  // Tässä kohdassa tehdään kaksiulotteisesta taulukosta näkyvä versio pelikentästä
  const displayRows = rows.map(row =>
    <div className='Snake-row'>{row.map(tile => <div className={`tile ${tile}`} /> )}</div>
  )

  return (
    <div className='Snake-board'>
     {displayRows}
    </div>
  )
}

export default SnakeBoard
