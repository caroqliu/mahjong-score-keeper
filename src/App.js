import React, { useState, useRef, useEffect } from 'react';
import Game from './game.js'
import './App.css';

const DEFAULT_PLAYER_NAMES = ['East', 'South', 'West', 'North'];

function App() {
  const [points, setPoints] = useState(400)
  const [chips, setChips] = useState(null)
  const names = useRef(DEFAULT_PLAYER_NAMES.slice(0))
  const restart = () => {
    names.current = DEFAULT_PLAYER_NAMES.slice(0);
    setChips(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        { chips == null ?  
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
          <button className="start-game" onClick={() => setChips(points)}>Start</button>
        </>: <Game chips={chips} players={names.current} onRestart={restart}/>}
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
