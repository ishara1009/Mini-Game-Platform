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
  const [showHelp, setShowHelp] = useState(false);
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
      <div className="game-header">
        <h1 className="game-title">Rock Paper Scissors</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="help-button"
          onClick={() => setShowHelp(!showHelp)}
        >
          ?
        </motion.button>
      </div>

      {showHelp && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="help-modal"
        >
          <div className="help-content">
            <h2>Rock Paper Scissors - How to Play</h2>
            
            <div className="help-section">
              <h3>About the Game</h3>
              <p>Challenge the computer in this classic game of strategy and luck. Rock beats Scissors, Scissors beats Paper, and Paper beats Rock!</p>
            </div>

            <div className="help-section">
              <h3>How to Play</h3>
              <ul>
                <li><strong>Choose Your Move:</strong> Click Rock, Paper, or Scissors</li>
                <li><strong>Computer Plays:</strong> The computer makes its random choice</li>
                <li><strong>Determine Winner:</strong> Based on classic game rules</li>
                <li><strong>Score Updates:</strong> Your win count increases</li>
                <li><strong>Play Again:</strong> Click any choice to play another round</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Winning Rules</h3>
              <ul>
                <li>Rock crushes Scissors → Rock wins</li>
                <li>Scissors cuts Paper → Scissors wins</li>
                <li>Paper covers Rock → Paper wins</li>
                <li>Same choice = Draw (no points)</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Tips for Playing</h3>
              <ul>
                <li>✓ Play based on strategy or intuition</li>
                <li>✓ Remember the winning combinations</li>
                <li>✓ Challenge your playing patterns</li>
                <li>✓ Have fun competing with the computer!</li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="close-help-button"
              onClick={() => setShowHelp(false)}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      )}

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
