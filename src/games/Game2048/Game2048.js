import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './Game2048.css';

const Game2048 = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { updateScore } = useContext(ScoreContext);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        moveGrid(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grid, gameOver]);

  const initializeGame = () => {
    const newGrid = Array(16).fill(0);
    addNewTile(newGrid);
    addNewTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const addNewTile = (currentGrid) => {
    const emptyIndices = currentGrid
      .map((val, idx) => (val === 0 ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length > 0) {
      const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      currentGrid[randomIdx] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const moveGrid = (direction) => {
    if (gameOver || won) return;

    let newGrid = grid.map((val) => val);
    let moved = false;
    let newScore = score;

    if (direction === 'ArrowLeft') {
      newGrid = moveLeft(newGrid);
    } else if (direction === 'ArrowRight') {
      newGrid = moveRight(newGrid);
    } else if (direction === 'ArrowUp') {
      for (let i = 0; i < 4; i++) {
        newGrid = rotateClockwise(newGrid);
      }
      newGrid = moveLeft(newGrid);
      for (let i = 0; i < 4; i++) {
        newGrid = rotateCounterClockwise(newGrid);
      }
    } else if (direction === 'ArrowDown') {
      for (let i = 0; i < 4; i++) {
        newGrid = rotateCounterClockwise(newGrid);
      }
      newGrid = moveLeft(newGrid);
      for (let i = 0; i < 4; i++) {
        newGrid = rotateClockwise(newGrid);
      }
    }

    moved = JSON.stringify(newGrid) !== JSON.stringify(grid);

    if (moved) {
      addNewTile(newGrid);
      setGrid(newGrid);
      checkWin(newGrid);
      checkGameOver(newGrid);
    }
  };

  const moveLeft = (currentGrid) => {
    let newGrid = currentGrid.map((val) => val);
    let newScore = score;

    for (let row = 0; row < 4; row++) {
      let line = newGrid.slice(row * 4, row * 4 + 4);
      line = compressLine(line);
      line = mergeLine(line);
      line = compressLine(line);

      for (let col = 0; col < 4; col++) {
        newGrid[row * 4 + col] = line[col];
      }
    }

    return newGrid;
  };

  const moveRight = (currentGrid) => {
    let newGrid = currentGrid.map((val) => val);

    for (let row = 0; row < 4; row++) {
      let line = newGrid.slice(row * 4, row * 4 + 4).reverse();
      line = compressLine(line);
      line = mergeLine(line);
      line = compressLine(line);
      line = line.reverse();

      for (let col = 0; col < 4; col++) {
        newGrid[row * 4 + col] = line[col];
      }
    }

    return newGrid;
  };

  const compressLine = (line) => {
    return line.filter((val) => val !== 0).concat(Array(4 - line.filter((val) => val !== 0).length).fill(0));
  };

  const mergeLine = (line) => {
    let newLine = [...line];
    for (let i = 0; i < 3; i++) {
      if (newLine[i] !== 0 && newLine[i] === newLine[i + 1]) {
        newLine[i] *= 2;
        setScore((prev) => prev + newLine[i]);
        newLine[i + 1] = 0;
      }
    }
    return newLine;
  };

  const rotateClockwise = (currentGrid) => {
    const rotated = Array(16).fill(0);
    for (let i = 0; i < 16; i++) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      rotated[col * 4 + (3 - row)] = currentGrid[i];
    }
    return rotated;
  };

  const rotateCounterClockwise = (currentGrid) => {
    const rotated = Array(16).fill(0);
    for (let i = 0; i < 16; i++) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      rotated[(3 - col) * 4 + row] = currentGrid[i];
    }
    return rotated;
  };

  const checkWin = (currentGrid) => {
    if (!won && currentGrid.some((val) => val === 2048)) {
      setWon(true);
      updateScore('game2048', 1);
    }
  };

  const checkGameOver = (currentGrid) => {
    if (currentGrid.some((val) => val === 0)) return;

    for (let i = 0; i < 16; i++) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      const current = currentGrid[i];

      if (col < 3 && current === currentGrid[i + 1]) return;
      if (row < 3 && current === currentGrid[i + 4]) return;
    }

    setGameOver(true);
    updateScore('game2048', score);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="game-2048-container"
    >
      <div className="game-header">
        <h1 className="game-title">2048</h1>
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
            <h2>2048 - How to Play</h2>
            
            <div className="help-section">
              <h3>About the Game</h3>
              <p>Slide tiles on a 4x4 grid to combine numbers and reach 2048! When two tiles with the same number touch, they merge into one.</p>
            </div>

            <div className="help-section">
              <h3>How to Play</h3>
              <ul>
                <li><strong>Use Arrow Keys:</strong> Press Up, Down, Left, or Right to move tiles</li>
                <li><strong>Combine Tiles:</strong> Two tiles with the same number merge when they touch</li>
                <li><strong>New Tiles Appear:</strong> A random tile (2 or 4) appears after each move</li>
                <li><strong>Build Up:</strong> Keep combining to create larger numbers</li>
                <li><strong>Reach 2048:</strong> Combine tiles to reach the 2048 tile to win</li>
                <li><strong>Game Over:</strong> When no moves are possible, the game ends</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Scoring Strategy</h3>
              <ul>
                <li>Each merge creates score based on the resulting tile value</li>
                <li>Your score is the sum of all merged tiles</li>
                <li>Higher tiles = higher points</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Tips for Winning</h3>
              <ul>
                <li>✓ Plan multiple moves ahead</li>
                <li>✓ Keep your high-value tiles in corners</li>
                <li>✓ Avoid filling all four sides early</li>
                <li>✓ Work systematically, one direction at a time</li>
                <li>✓ Try to keep one side (corner) empty for flexibility</li>
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

      <div className="game-info">
        <div className="score-box">
          <div className="label">Score</div>
          <div className="score-value">{score}</div>
        </div>
      </div>

      {won && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="win-message"
        >
          You Won! Score: {score}
        </motion.div>
      )}

      {gameOver && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="game-over-message"
        >
          Game Over! Final Score: {score}
        </motion.div>
      )}

      <div className="game-grid-2048">
        {grid.map((value, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`tile tile-${value}`}
          >
            {value !== 0 && <span className="tile-value">{value}</span>}
          </motion.div>
        ))}
      </div>

      <p className="instructions">Use arrow keys to move tiles</p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="start-button"
        onClick={initializeGame}
      >
        New Game
      </motion.button>
    </motion.div>
  );
};

export default Game2048;
