
import React from 'react';

const PlayAgain = props => (
    <div className="game-done">
      <div
        class="message"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}>
        {props.gameStatus === "lost" ? "Game Over" : "You Won!"}
      </div>
      <button className="playagain" 
      onClick={props.onClick}>Play Again</button>
    </div>
  );

  export default PlayAgain;