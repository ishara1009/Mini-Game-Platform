import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './NumberGuessingGame.css';

const NumberGuessingGame = () => {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const { updateScore } = useContext(ScoreContext);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100');
    setAttempts(0);
    setGameOver(false);
    setGuesses([]);
  };

  const handleGuess = () => {
    const num = parseInt(guess);

    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a valid number between 1 and 100');
      return;
    }

    setAttempts(attempts + 1);
    setGuesses([...guesses, num]);
    setGuess('');

    if (num === secretNumber) {
      setMessage(`Correct! You guessed it in ${attempts + 1} attempts!`);
      setGameOver(true);
      updateScore('numberGuessingGame', 1);
    } else if (num < secretNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameOver) {
      handleGuess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="number-game-container"
    >
      <h1 className="game-title">Number Guessing Game</h1>

      <div className="attempts-counter">
        Attempts: <span>{attempts}</span>
      </div>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className={`message ${gameOver ? 'win' : ''}`}
      >
        {message}
      </motion.div>

      <div className="input-group">
        <input
          type="number"
          min="1"
          max="100"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={gameOver}
          placeholder="Enter your guess"
          className="number-input"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="guess-button"
          onClick={handleGuess}
          disabled={gameOver}
        >
          Guess
        </motion.button>
      </div>

      {guesses.length > 0 && (
        <div className="guesses-history">
          <p>Your guesses:</p>
          <div className="guesses-list">
            {guesses.map((g, index) => (
              <span key={index} className="guess-item">
                {g}
              </span>
            ))}
          </div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="restart-button"
        onClick={resetGame}
      >
        {gameOver ? 'Play Again' : 'Reset Game'}
      </motion.button>
    </motion.div>
  );
};

export default NumberGuessingGame;
