import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './Hangman.css';

const Hangman = () => {
  const words = ['JAVASCRIPT', 'REACT', 'PROGRAMMING', 'DEVELOPER', 'COMPUTER', 'HANGMAN', 'FUNCTION', 'DATABASE'];
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const { updateScore } = useContext(ScoreContext);

  const maxWrongGuesses = 6;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setWon(false);
  };

  const displayWord = () => {
    return word
      .split('')
      .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  };

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameOver || won) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    if (!word.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);

      if (newWrong >= maxWrongGuesses) {
        setGameOver(true);
      }
    }

    // Check if won
    const wordLetters = word.split('');
    if (wordLetters.every((l) => newGuessed.includes(l))) {
      setWon(true);
      updateScore('hangman', 1);
    }
  };

  const getHangmanStage = () => {
    const stages = [
      '   ------\n   |    |\n        |\n        |\n        |\n        |\n---------',
      '   ------\n   |    |\n   O    |\n        |\n        |\n        |\n---------',
      '   ------\n   |    |\n   O    |\n   |    |\n        |\n        |\n---------',
      '   ------\n   |    |\n   O    |\n  /|    |\n        |\n        |\n---------',
      '   ------\n   |    |\n   O    |\n  /|\\   |\n        |\n        |\n---------',
      '   ------\n   |    |\n   O    |\n  /|\\   |\n   /    |\n        |\n---------',
      '   ------\n   |    |\n   O    |\n  /|\\   |\n   / \\ |\n        |\n---------',
    ];
    return stages[wrongGuesses];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hangman-container"
    >
      <h1 className="game-title">Hangman</h1>

      <div className="hangman-content">
        <div className="hangman-display">
          <pre className="hangman-drawing">{getHangmanStage()}</pre>
          <div className="wrong-counter">
            Wrong: {wrongGuesses}/{maxWrongGuesses}
          </div>
        </div>

        <div className="hangman-game">
          <motion.div
            key={displayWord()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="word-display"
          >
            {displayWord()}
          </motion.div>

          {won && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="status-message won"
            >
              You Won! The word was: {word}
            </motion.div>
          )}

          {gameOver && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="status-message lost"
            >
              Game Over! The word was: {word}
            </motion.div>
          )}

          <div className="letters-grid">
            {alphabet.map((letter) => (
              <motion.button
                key={letter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`letter-button ${
                  guessedLetters.includes(letter) ? 'guessed' : ''
                } ${
                  !word.includes(letter) && guessedLetters.includes(letter)
                    ? 'wrong'
                    : ''
                }`}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter) || gameOver || won}
              >
                {letter}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="restart-button"
            onClick={resetGame}
          >
            {gameOver || won ? 'Play Again' : 'Reset Game'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Hangman;
