import React, {useState} from 'react'
import {useInterval, range} from './utils'
import './SnakeBoard.css'

const SnakeBoard = ({points, setPoints}) => {
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

  const obstacles = [
    {name: 'tyhjä',location: []},
    {
      name: 'keski',
      location: range(width * 0.60).map(
        (y) => ({x: Math.round(height/2), y: y+Math.ceil(width*0.2)})
      )
    },
    {
      name: 'reunat',
      location: [
        // Ulommaiset reunat
        ...range(width).map(x => ({x, y: 0})),
        ...range(width).map(x => ({x, y: height-1})),
        ...range(height).map(y => ({x: 0, y})),
        ...range(height).map(y => ({x: width-1, y})),
      ]
    },
    // TODO: Oppitunnilla kaikki tekee kolmannen oman esteen!
  ]

  const randomObstacle = () =>
    obstacles[Math.floor(Math.random() * obstacles.length)]

  // Satunnainen sijainti x ja y -koordinaatistossa
  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    }
    if (obstacle.location.some(({x,y}) => position.x === x && position.y === y)) {
      return randomPosition()
    }
    return position
  }

  /*
  Reactin statea voi käyttää Hookien avulla myös tällaisissa luokattomissa
  komponenteissa. https://joinex.fi/react-pahkinankuoressa/
  */
  // Rows eli rivit merkitsee tässä pelilaudan rivejä
  const [obstacle] = useState(randomObstacle())
  const [rows, setRows] = useState(initialRows)
  // Lisätään mato. Mato on lista objekteja, joihin tallennetaan madon osien x ja y -sijainnit.
  // Alustetaan madon pään sijainniksi {x:0, y:0}
  const [snake, setSnake] = useState([{x:1, y:1}])
  // Alustetaan madon suunnaksi oikealle
  const [direction, setDirection] = useState('right')
  // Käytetään randomPosition funktiota alustamaan ruuan sijainti kun mato syö ruuan
  const [food, setFood] = useState(randomPosition)
  // Tallennetaan interval id stateen, jotta sen voi pelin loppuessa pysäyttää
  const [intervalId, setIntervalId] = useState()
  const [isGameOver, setIsGameOver] = useState(false)

  const changeDirectionWithKeys = (e) => {
    var { keyCode } = e;
    switch(keyCode) {
      case 37:
        setDirection('left')
        break
      case 38:
        setDirection('top')
        break
      case 39:
        setDirection('right')
        break
      case 40:
        setDirection('bottom')
        break
      default: break
    }
  }
  document.addEventListener("keydown", changeDirectionWithKeys, false)

  // Tässä kohdassa tehdään kaksiulotteisesta taulukosta näkyvä versio pelikentästä
  const displayRows = rows.map((row, i) =>
    <div className='Snake-row' key={i}>{row.map((tile, j) => <div className={`tile ${tile}`} key={j} /> )}</div>
  )

  // Asetetaan mato pelilaudalle madon x ja y -sijaintien mukaisesti
  // Asetetaan samalla myös ruoka pelilaudalle (x,y)
  const displaySnake = () => {
      const newRows = initialRows
      snake.forEach(tile => {newRows[tile.x][tile.y] = 'snake'})
      newRows[food.x][food.y] = 'food'
      obstacle.location.forEach(tile => {newRows[tile.x][tile.y] = 'obstacle'})
      setRows(newRows)
  }

  // Tarkistetaan onko mato osunut itseensä
  const checkGameOver = () => {
    const head = snake[0]
    const body = snake.slice(1, -1)
    const hitsSnake = body.find(b => b.x === head.x && b.y === head.y)
    const hitsWall = obstacle.location.some(({x,y}) => head.x === x && head.y === y)
    return hitsSnake || hitsWall
  }

  // Liikutetaan matoa haluttuun suuntaan
  const moveSnake = () => {
    const newSnake = []
    switch(direction) {
      // Jakojäännös (%) tarkoittaa jakolaskussa yli jäävää kokonaislukua.
      // Esimerkiksi jos luku 17 jaetaan luvulla 5, jakojäännös on 2, koska 3 · 5 = 15, mutta 2 jää yli.
      // snake[0] on madon ensimmäinen osa eli pää
      case 'right':
        // x pysyy samana, y menee yhden askeleen oikealle eli plus yksi
        newSnake.push({x: snake[0].x, y: (snake[0].y + 1) % width})
        break
      case 'left':
        // x pysyy samana, y menee yhden askeleen vasemmalle eli miinus yksi
        newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width) % width})
        break
      case 'top':
        // x menee yhden askeleen ylöspäin eli miinus yksi, y pysyy samana
        newSnake.push({x: (snake[0].x - 1 + height) % height, y: snake[0].y})
        break
      case 'bottom':
        // x menee yhden askeleen alaspäin eli plus yksi, y pysyy samana
        newSnake.push({x: (snake[0].x + 1) % height, y: snake[0].y})
        break
      default:
        break
    }

    if (checkGameOver()) {
      setIsGameOver(true)
      // Pysäytä madon liikkumisen intervalli
      clearInterval(intervalId)
      // Lisää pisteet local storageen tulostaulukkoa varten
      // HUOM! Local storage hyväksyy vain JSON:ia
      const pointsList = JSON.parse(localStorage.getItem('snake-points')) || []
      const name = prompt('Peli päättyi! Anna nimi:')
      pointsList.push({name, points});
      localStorage.setItem('snake-points', JSON.stringify(pointsList))
      window.dispatchEvent( new Event('storage') )
    }

    // Lisätään madolle joka intervallilla / "askeleella" uusi pala
    snake.forEach(tile => { newSnake.push(tile) })

    // Vaihdetaan ruuan sijaintia jos mato syö ruuan.
    if(snake[0].x === food.x && snake[0].y === food.y) {
      setFood(randomPosition)
      setPoints(points+1)
    } else {
      // Jos mato ei syö ruokaa, poistetaan viimeinen hännän pala,
      // jottei mato kasva joka askeleella, vaan vain silloin kun se saa ruuan kiinni!
      newSnake.pop()
    }

    setSnake(newSnake)
    displaySnake()
  }

  // Käytetään kustomoitua intervalli-funktiota madon liikuttamiseen
  useInterval(moveSnake, 250, setIntervalId)

  return (
    <div className='Snake-board'>
      {displayRows}
      {isGameOver && <div className='Game-over'>Game over!</div>}
    </div>
  )
}

export default SnakeBoard
