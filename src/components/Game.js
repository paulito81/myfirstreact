import React, { useState, useEffect } from "react";
import PlayAgain from './gameplay/PlayAgain';
import PlayNumber from './gameplay/PlayNumber';
import StarsDisplay from './gameplay/StarsDisplay';
import utils from './../util-math';

// custom hook initaliserer state,
const useGameState = () => {
  // First lines should hold hooks into the state, hooks into sideeffects.
  const [stars, setStars] = useState(utils.random(1, 15));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 15));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(20);
  useEffect((props) => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      if(secondsLeft < 10){
        
      }
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      // Remove old timer and re-run a new
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = newCandidateNums => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      // redraw numbers
      setStars(utils.randomSumIn(newAvailableNums, 15));
      setAvailableNums(newAvailableNums);
      // reset numbers
      setCandidateNums([]);
    }
  };
  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const Game = (props) => {
  // Computation based on State
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  } = useGameState();

  // Compute wrong candidates
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // Gameover
  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";
  
  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    // candidateNumbers
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter(candNum => candNum !== number);

    setGameState(newCandidateNums);

  };

  //Description of UI based onState and Computation
  return (
    <div className="game">
      <div className="game-header">Stars Game</div>
      <div className="help">
        Klikk 1 eller flere tall som summerer antall stjerner på skjermen!{" "}
      </div>
      <div className="body">
        <div className="left">
          {" "}
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 15).map(number => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className={secondsLeft > 10 ? 'timer' : 'timer2' }>Tid igjen: {secondsLeft} </div>
    </div>
  );
};
const StarMatch = () => {
  // mount new game with new ID
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default StarMatch;
