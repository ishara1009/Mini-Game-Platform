import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './FlappyBird.css';

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { updateScore } = useContext(ScoreContext);

  const gameState = useRef({
    bird: { x: 50, y: 150, radius: 12, velocity: 0 },
    gravity: 0.6,
    jumpPower: -12,
    pipes: [],
    pipeGap: 150,
    pipeWidth: 50,
    pipeFrequency: 120,
    frameCount: 0,
    score: 0,
    gameOver: false,
  });

  const startGame = () => {
    gameState.current = {
      bird: { x: 50, y: 150, radius: 12, velocity: 0 },
      gravity: 0.6,
      jumpPower: -12,
      pipes: [],
      pipeGap: 150,
      pipeWidth: 50,
      pipeFrequency: 120,
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
    if (!gameStarted || gameOver) return;

    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
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
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

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
        state.pipes[i].x -= 5;

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
  }, [gameStarted, gameOver]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flappy-container"
    >
      <h1 className="game-title">Flappy Bird</h1>

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
        width={400}
        height={600}
        className="game-canvas"
        onClick={jump}
      />

      <p className="instructions">
        {gameStarted ? 'Press SPACE or Click to jump' : 'Press START to begin'}
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
