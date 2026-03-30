import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './SimonSays.css';

const SimonSays = () => {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const { updateScore } = useContext(ScoreContext);

  const colorMap = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#fbbf24',
  };

  useEffect(() => {
    if (gameStarted && playerSequence.length === 0 && sequence.length > 0) {
      playSequence();
    }
  }, [gameStarted, sequence]);

  const startGame = () => {
    setGameStarted(true);
    setSequence([]);
    setPlayerSequence([]);
    setLevel(0);
    setGameOver(false);
    playNextRound();
  };

  const playNextRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    setPlayerSequence([]);
    setLevel(newSequence.length);

    setTimeout(() => {
      playSequence(newSequence);
    }, 500);
  };

  const playSequence = async (seq = sequence) => {
    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          flashColor(seq[i]);
          resolve();
        }, i * 600);
      });
    }
  };

  const flashColor = (color) => {
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 300);
  };

  const handleColorClick = (color) => {
    if (!gameStarted || gameOver) return;

    flashColor(color);
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      updateScore('simonSays', level);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setTimeout(() => {
        playNextRound();
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="simon-container"
    >
      <h1 className="game-title">Simon Says</h1>

      <div className="level-display">Level: {level}</div>

      {gameOver && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="game-over-message"
        >
          Game Over! Final Level: {level}
        </motion.div>
      )}

      <div className="simon-grid">
        {colors.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`simon-button ${color} ${activeColor === color ? 'active' : ''}`}
            style={{
              backgroundColor: colorMap[color],
              boxShadow:
                activeColor === color ? `0 0 30px ${colorMap[color]}` : 'none',
            }}
            onClick={() => handleColorClick(color)}
            disabled={!gameStarted || gameOver}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="start-button"
        onClick={startGame}
        disabled={gameStarted && !gameOver}
      >
        {gameStarted ? (gameOver ? 'Play Again' : 'Running...') : 'Start Game'}
      </motion.button>
    </motion.div>
  );
};

export default SimonSays;
