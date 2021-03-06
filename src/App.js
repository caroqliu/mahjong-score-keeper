import React, { useState, useRef, useEffect } from 'react';
import Game from './game.js'
import './App.css';

const DEFAULT_PLAYER_NAMES = ['东', '南', '西', '北'];

function App() {
  const [points, setPoints] = useState(400)
  const [gameInProgress, setGameInProgress] = useState(false)
  const names = useRef(DEFAULT_PLAYER_NAMES.slice(0))
  const restart = () => {
    setGameInProgress(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        { gameInProgress ?
        <Game chips={points} players={names.current} onRestart={restart}/> :
        <>
          <h1>
            Let's play Mahjong!
          </h1>
          <p>How many points are in the pot?<br/>
            <input value={points} onChange={e => setPoints(e.target.value)}/>
          </p>
          <p>Who is playing?<br />
          {names.current.map((name, i) => <PlayerName key={'player-' + name} dir={name} index={i} players={names}/>)}
          </p>
          <button className="start-game" onClick={() => setGameInProgress(true)}>开始!</button>
        </>}
      </header>
    </div>
  );
}

function PlayerName({index, dir, players}) {
  const [name, setName] = useState(dir);
  useEffect(() => {players.current[index] = name}, [name, index, players])
  return ( <input placeholder={dir}
  onChange={e => setName(e.target.value || dir)} />)
}

export default App;
