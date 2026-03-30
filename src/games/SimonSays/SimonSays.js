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
  const [showHelp, setShowHelp] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
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
      <div className="game-header">
        <h1 className="game-title">Simon Says</h1>
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
            <h2>Simon Says - How to Play</h2>
            
            <div className="help-section">
              <h3>About the Game</h3>
              <p>Watch Simon's color sequence and repeat it! Each level adds a new color to the sequence, making it harder and harder.</p>
            </div>

            <div className="help-section">
              <h3>How to Play</h3>
              <ul>
                <li><strong>Start the Game:</strong> Click the "Start Game" button</li>
                <li><strong>Watch the Sequence:</strong> Simon lights up a sequence of colored buttons</li>
                <li><strong>Repeat the Sequence:</strong> Click the colors in the same order</li>
                <li><strong>Level Up:</strong> After each correct sequence, a new color is added</li>
                <li><strong>Challenge:</strong> Sequences get longer and more complex</li>
                <li><strong>Game Over:</strong> You lose if you click the wrong color</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Scoring</h3>
              <ul>
                <li>You earn points based on the highest level reached</li>
                <li>Each level successfully completed increases your score</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Tips for Success</h3>
              <ul>
                <li>✓ Pay close attention to the color sequence</li>
                <li>✓ Remember the entire sequence from start to finish</li>
                <li>✓ Space your clicks to match the timing</li>
                <li>✓ Focus on patterns and groups of colors</li>
                <li>✓ Practice to reach higher levels!</li>
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
            <p><strong>Objective:</strong> Follow the pattern of colored lights as it gets longer and longer. Test your memory and reaction time in this classic memory game!</p>
            <p><strong>How to Play:</strong> Click Start to begin. Watch the colors flash in order. Then repeat the sequence by clicking the colored buttons in the same order. Each round adds one more flash to the sequence. Can you remember them all?</p>
            <p><strong>Tips:</strong> Pay close attention to the order and timing of flashes. Start slowly and increase speed. Say the color order out loud to help remember. Practice to beat higher levels!</p>\
          </div>
        </motion.div>
      )}

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
