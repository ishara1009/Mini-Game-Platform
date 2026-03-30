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
  const [showHelp, setShowHelp] = useState(false);
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
      <div className="game-header">
        <h1 className="game-title">Number Guessing Game</h1>
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
            <h2>Number Guessing Game - How to Play</h2>
            
            <div className="help-section">
              <h3>About the Game</h3>
              <p>The computer picks a secret number between 1 and 100. Your job is to guess the number in as few attempts as possible!</p>
            </div>

            <div className="help-section">
              <h3>How to Play</h3>
              <ul>
                <li><strong>Enter a Number:</strong> Type a number between 1 and 100 in the input field</li>
                <li><strong>Submit Your Guess:</strong> Click "Guess" or press Enter</li>
                <li><strong>Read the Feedback:</strong> You'll be told if your guess is too high or too low</li>
                <li><strong>Adjust and Guess Again:</strong> Use the hints to narrow down the number</li>
                <li><strong>Win:</strong> Guess the exact number to win!</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Scoring & Tracking</h3>
              <ul>
                <li>You earn points for correct guesses</li>
                <li>Your attempts counter shows how many tries you've used</li>
                <li>Fewer attempts = better performance</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Tips for Guessing</h3>
              <ul>
                <li>✓ Start with 50 to split the range in half</li>
                <li>✓ Use binary search strategy (halving each time)</li>
                <li>✓ Remember previously guessed numbers</li>
                <li>✓ Listen to the feedback carefully</li>
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
