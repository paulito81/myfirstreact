
import React from 'react';

const PlayAgain = props => (
    <div className="game-done">
      <div
        class="message"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}>
        {props.gameStatus === "lost" ? "Game Over" : "You Won!"}
      </div>
      <button className="playagain" 
      onClick={props.onClick}>Spille på nytt?</button>
    </div>
  );

  export default PlayAgain;