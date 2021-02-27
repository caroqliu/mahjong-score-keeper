import React, {useState, useRef} from 'react';
import './game.css';

const NUM_PLAYERS = 4;
const WINDS = ['东', '南', '西', '北'];

export default function Game(props) {
    const {chips, onRestart, players} = props;
    const perPlayerChips = Math.floor(chips / NUM_PLAYERS);
    const playerTotals = useRef(Array(NUM_PLAYERS).fill(perPlayerChips));
    const [wind, setWind] = useState(0);
    const [, setRound] = useState(1);
    const roundMaster = useRef(0);

    const onWin = (index) => (name) => {
        const pointsWon = Number(prompt(`How many points did ${name} win?`));
        playerTotals.current.forEach((x, i) => {
            playerTotals.current[i] = (i === index) ? x + (3 * pointsWon) : x - pointsWon
        });
        if (roundMaster.current !== index) {
            const newWind = roundMaster.current + 1 >= 4;
            roundMaster.current = (roundMaster.current + 1) % NUM_PLAYERS;
            if (newWind) {
                setWind(x => x + 1)
            }
        }
        setRound(x => x + 1);
    }
    return (<>
        <button className="restart" onClick={onRestart}>Restart</button>
        <span>Wind: {WINDS[wind]}</span>
        <span>Round Master: {players[roundMaster.current]}</span>
        <div className="player-container">
            <div className="top">
                <Player dir="east" onWin={onWin(0)} name={players[0]} points={playerTotals.current[0]}/>
            </div>
            <div className="middle">
                <Player dir="north" onWin={onWin(3)} name={players[3]} points={playerTotals.current[3]}/>
                <Player dir="south" onWin={onWin(1)} name={players[1]} points={playerTotals.current[1]}/>
            </div>
            <div className="bottom">
                <Player dir="west" onWin={onWin(2)} name={players[2]} points={playerTotals.current[2]}/>
            </div>
        </div>
    </>);
}

function Player({name, points, className, onWin}) {
    return <div className={className + " player"}>
        <div><p>
            Score: {points}
        </p>
        </div>
        <button onClick={() => onWin(name)}>{name} won!</button>
    </div>;
}
