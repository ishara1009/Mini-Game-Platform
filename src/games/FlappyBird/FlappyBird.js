import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './FlappyBird.css';

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 700 });
  const { updateScore } = useContext(ScoreContext);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth - 40;
      const maxHeight = window.innerHeight - 300;
      const canvasWidth = Math.min(600, maxWidth);
      const canvasHeight = Math.min(700, maxHeight);
      setCanvasSize({ width: canvasWidth, height: canvasHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gameState = useRef({
    bird: { x: 50, y: 150, radius: 12, velocity: 0 },
    gravity: 0.2,
    jumpPower: -6,
    pipes: [],
    pipeGap: 220,
    pipeWidth: 50,
    pipeFrequency: 150,
    frameCount: 0,
    score: 0,
    gameOver: false,
  });

  const startGame = () => {
    gameState.current = {
      bird: { x: canvasSize.width * 0.15, y: canvasSize.height * 0.5, radius: 12, velocity: 0 },
      gravity: 0.2,
      jumpPower: -6,
      pipes: [],
      pipeGap: 220,
      pipeWidth: 50,
      pipeFrequency: 150,
      frameCount: 0,
      score: 0,
      gameOver: false,
    };
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  const jump = () => {
    if (gameState.current.gameOver || !gameStarted) return;
    gameState.current.bird.velocity = gameState.current.jumpPower;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        if (!gameStarted || gameOver) {
          startGame();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    const gameLoop = () => {
      const state = gameState.current;

      state.bird.velocity += state.gravity;
      state.bird.y += state.bird.velocity;

      state.frameCount++;

      if (state.frameCount % state.pipeFrequency === 0) {
        const gapStart = Math.random() * (canvasHeight - state.pipeGap - 40) + 20;
        state.pipes.push({
          x: canvasWidth,
          gapStart: gapStart,
          gapEnd: gapStart + state.pipeGap,
          scored: false,
        });
      }

      for (let i = state.pipes.length - 1; i >= 0; i--) {
        state.pipes[i].x -= 2;

        if (!state.pipes[i].scored && state.pipes[i].x + state.pipeWidth < state.bird.x) {
          state.pipes[i].scored = true;
          state.score++;
          setScore(state.score);
        }

        if (
          state.bird.x + state.bird.radius > state.pipes[i].x &&
          state.bird.x - state.bird.radius < state.pipes[i].x + state.pipeWidth
        ) {
          if (
            state.bird.y - state.bird.radius < state.pipes[i].gapStart ||
            state.bird.y + state.bird.radius > state.pipes[i].gapEnd
          ) {
            state.gameOver = true;
            setGameOver(true);
            updateScore('flappyBird', state.score);
            return;
          }
        }

        if (state.pipes[i].x < -state.pipeWidth) {
          state.pipes.splice(i, 1);
        }
      }

      if (state.bird.y - state.bird.radius < 0 || state.bird.y + state.bird.radius > canvasHeight) {
        state.gameOver = true;
        setGameOver(true);
        updateScore('flappyBird', state.score);
        return;
      }

      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(state.bird.x, state.bird.y, state.bird.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      state.pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, state.pipeWidth, pipe.gapStart);
        ctx.fillRect(pipe.x, pipe.gapEnd, state.pipeWidth, canvasHeight - pipe.gapEnd);
      });

      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [gameStarted, gameOver, canvasSize]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flappy-container"
    >
      <div className="game-header">
        <h1 className="game-title">Flappy Bird</h1>
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
            <h2>How to Play Flappy Bird</h2>
            
            <div className="help-section">
              <h3>About the Game</h3>
              <p>Navigate your bird through green pipes without hitting them. Pass through each pipe gap to earn points!</p>
            </div>

            <div className="help-section">
              <h3>Controls</h3>
              <ul>
                <li><strong>Start Game:</strong> Press ENTER or click START button</li>
                <li><strong>Jump:</strong> Press SPACE or click on canvas</li>
                <li><strong>Restart:</strong> Press ENTER or click PLAY AGAIN</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Game Rules</h3>
              <ul>
                <li>The bird falls automatically due to gravity</li>
                <li>Jump to move up and navigate through pipes</li>
                <li>Avoid hitting pipes, top wall, and bottom wall</li>
                <li>Earn +1 point for each pipe pair passed</li>
                <li>Game ends on collision</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Tips for Success</h3>
              <ul>
                <li>✓ Jump smoothly and gently through gaps</li>
                <li>✓ Keep bird in the middle of the gap</li>
                <li>✓ Tap SPACE multiple times for better control</li>
                <li>✓ Don't jump too early or too hard</li>
                <li>✓ Practice timing your jumps</li>
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

      <div className="score-display">Score: {score}</div>

      {gameOver && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="game-over-message"
        >
          Game Over! Final Score: {score}
        </motion.div>
      )}

      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="game-canvas"
        onClick={jump}
      />

      <p className="instructions">
        {gameStarted ? 'Press SPACE or Click to jump' : 'Press ENTER or click START to begin'}
      </p>

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

export default FlappyBird;
