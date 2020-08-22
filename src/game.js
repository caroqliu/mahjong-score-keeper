import React, {useState} from 'react';
import './game.css';

const NUM_PLAYERS = 4;
export default function Game(props) {
    const perPlayerChips = Math.floor(props.chips / NUM_PLAYERS)
    const [round, setRound] = useState(1);
    return (<>
        <p>Round {round}</p>
        <div className="player-container">
            <div className="top">
                <Player name={props.players[0]} points={perPlayerChips}/>
            </div>
            <div className="middle">
                <Player name={props.players[1]} points={perPlayerChips}/>
                <Player name={props.players[2]} points={perPlayerChips}/>
            </div>
            <div className="bottom">
                <Player name={props.players[3]} points={perPlayerChips}/>
            </div>
        </div>
    </>);
}

function Player(props) {
    const name = props.name || "A"
    return <div className={props.className + " player"}>
        <div><p>
            Score: {props.points}
        </p>
        </div>
        <button>{name} won!</button>
    </div>;
}