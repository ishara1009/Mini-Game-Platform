import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './RockPaperScissors.css';

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const { updateScore } = useContext(ScoreContext);

  const choices = ['Rock', 'Paper', 'Scissors'];

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'Draw';
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'Won';
    }
    return 'Lost';
  };

  const handlePlay = (choice) => {
    const computer = getComputerChoice();
    const outcome = determineWinner(choice, computer);

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(outcome);

    if (outcome === 'Won') {
      setPlayerScore(playerScore + 1);
      updateScore('rockPaperScissors', 1);
    } else if (outcome === 'Lost') {
      setComputerScore(computerScore + 1);
    }
  };

  const handleReset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rps-container"
    >
      <h1 className="game-title">Rock Paper Scissors</h1>

      <div className="score-board">
        <div className="score-section">
          <h3>You</h3>
          <p className="score">{playerScore}</p>
        </div>
        <div className="vs">VS</div>
        <div className="score-section">
          <h3>Computer</h3>
          <p className="score">{computerScore}</p>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`result-message ${result.toLowerCase()}`}
        >
          {result === 'Won' && 'You Won!'}
          {result === 'Lost' && 'Computer Won!'}
          {result === 'Draw' && "It's a Draw!"}
        </motion.div>
      )}

      <div className="choices-display">
        {playerChoice && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="choice-box"
          >
            <p>Your Choice</p>
            <p className="choice-text">{playerChoice}</p>
          </motion.div>
        )}

        {computerChoice && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="choice-box"
          >
            <p>Computer Choice</p>
            <p className="choice-text">{computerChoice}</p>
          </motion.div>
        )}
      </div>

      <div className="buttons-group">
        {choices.map((choice) => (
          <motion.button
            key={choice}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="choice-button"
            onClick={() => handlePlay(choice)}
          >
            {choice}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="reset-btn"
        onClick={handleReset}
      >
        Reset Game
      </motion.button>
    </motion.div>
  );
};

export default RockPaperScissors;
