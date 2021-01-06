import React, {useState} from 'react'
import {useInterval} from './utils'
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
  // Lisätään mato. Mato on lista objekteja, joihin tallennetaan madon osien x ja y -sijainnit.
  // Alustetaan madon pään sijainniksi {x:0, y:0}
  const [snake, setSnake] = useState([{x:0, y:0}])
  // Alustetaan madon suunnaksi oikealle
  const [direction, setDirection] = useState('right')

  // Tässä kohdassa tehdään kaksiulotteisesta taulukosta näkyvä versio pelikentästä
  const displayRows = rows.map(row =>
    <div className='Snake-row'>{row.map(tile => <div className={`tile ${tile}`} /> )}</div>
  )

  // Asetetaan mato pelilaudalle madon x ja y -sijaintien mukaisesti
  const displaySnake = () => {
      const newRows = initialRows
      snake.forEach(tile => {newRows[tile.x][tile.y] = 'snake'})
      setRows(newRows)
  }

  // Liikutetaan matoa haluttuun suuntaan
  const moveSnake = () => {
    const newSnake = []
    switch(direction) {
      // snake[0] on madon ensimmäinen osa eli pää
      case 'right':
        // x pysyy samana, y menee yhden askeleen oikealle eli plus yksi
        newSnake.push({x: snake[0].x, y: (snake[0].y + 1) % width})
        break
      default:
        break
    }
    setSnake(newSnake)
    displaySnake()
  }

  // Käytetään kustomoitua intervalli-funktiota madon liikuttamiseen
  useInterval(moveSnake, 250)

  return (
    <div className='Snake-board'>
     {displayRows}
    </div>
  )
}

export default SnakeBoard
