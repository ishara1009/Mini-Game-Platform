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
  const [showHelp, setShowHelp] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
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
      <div className="game-header">
        <h1 className="game-title">Hangman</h1>
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
            <h2>Hangman - How to Play</h2>
            
            <div className="help-section">
              <h3>About the Game</h3>
              <p>Guess the hidden word letter by letter before the hangman is complete! Every wrong guess adds a part to the hangman drawing.</p>
            </div>

            <div className="help-section">
              <h3>How to Play</h3>
              <ul>
                <li><strong>View the Hidden Word:</strong> See blanks representing each letter</li>
                <li><strong>Choose Letters:</strong> Click on letters A-Z to guess</li>
                <li><strong>Right Guesses:</strong> Correct letters appear in the word</li>
                <li><strong>Wrong Guesses:</strong> Wrong letters build the hangman</li>
                <li><strong>Win:</strong> Complete the word before hangman is finished</li>
                <li><strong>Lose:</strong> Hangman completes when you make 6 wrong guesses</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Scoring</h3>
              <ul>
                <li>You earn points for each correct word</li>
                <li>Successfully guessing all words is tracked</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Tips for Winning</h3>
              <ul>
                <li>✓ Start with common letters (E, A, R, S, T)</li>
                <li>✓ Look for patterns in the word</li>
                <li>✓ Avoid common wrong letters (Q, X, Z)</li>
                <li>✓ Use word structure and common combinations</li>
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

      {showIntro && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="game-intro"
        >
          <div className="intro-header">
            <h3>About This Game</h3>
            <button
              className="intro-close"
              onClick={() => setShowIntro(false)}
            >
              ×
            </button>
          </div>
          <div className="intro-content">
            <p><strong>Objective:</strong> Guess the hidden word letter by letter before running out of wrong guesses. Uncover the word to win!</p>
            <p><strong>How to Play:</strong> Click letters to guess them. If a letter appears in the word, it will be revealed. If not, you lose one chance. You get 6 wrong guesses before game over. Try to reveal the entire word!</p>
            <p><strong>Tips:</strong> Start with common letters like E, A, R, and O. Look for patterns in word structure. Think about categories the word might fall into. Use process of elimination wisely!</p>
          </div>
        </motion.div>
      )}

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
