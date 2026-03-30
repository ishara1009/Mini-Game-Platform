import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import GameCard from '../../components/GameCard';
import { ScoreContext } from '../../context/ScoreContext';
import './Home.css';

const Home = () => {
  const { scores, resetScores } = useContext(ScoreContext);

  const games = [
    {
      title: 'Tic Tac Toe',
      description: '2-player strategy game. Try to get three in a row!',
      path: '/tic-tac-toe',
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'Memory Game',
      description: 'Test your memory by matching pairs of cards.',
      path: '/memory-game',
      color: 'from-purple-500 to-purple-700',
    },
    {
      title: 'Rock Paper Scissors',
      description: 'Challenge the computer in this classic game.',
      path: '/rock-paper-scissors',
      color: 'from-red-500 to-red-700',
    },
    {
      title: 'Number Guessing',
      description: 'Guess the number between 1 and 100.',
      path: '/number-guessing',
      color: 'from-green-500 to-green-700',
    },
    {
      title: 'Hangman',
      description: 'Guess the word before the hangman is complete.',
      path: '/hangman',
      color: 'from-yellow-500 to-yellow-700',
    },
    {
      title: 'Simon Says',
      description: 'Repeat the color sequence as it gets harder.',
      path: '/simon-says',
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      title: '2048',
      description: 'Combine tiles to reach the 2048 tile.',
      path: '/game-2048',
      color: 'from-pink-500 to-pink-700',
    },
    {
      title: 'Flappy Bird',
      description: 'Navigate your bird through the obstacles.',
      path: '/flappy-bird',
      color: 'from-cyan-500 to-cyan-700',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home-container"
    >
      <div className="hero-section">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hero-title"
        >
          Welcome to Mini Game Platform
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hero-subtitle"
        >
          Choose a game and have fun!
        </motion.p>
      </div>

      <div className="scores-card">
        <div className="score-item">
          <span className="score-label">Total Games Played:</span>
          <span className="score-number">{scores.totalGames}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Tic Tac Toe Wins:</span>
          <span className="score-number">{scores.ticTacToe}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Memory Games Won:</span>
          <span className="score-number">{scores.memoryGame}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Rock Paper Scissors Wins:</span>
          <span className="score-number">{scores.rockPaperScissors}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Numbers Guessed Correctly:</span>
          <span className="score-number">{scores.numberGuessingGame}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Hangman Words Found:</span>
          <span className="score-number">{scores.hangman}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Simon Says Levels:</span>
          <span className="score-number">{scores.simonSays}</span>
        </div>
        <div className="score-item">
          <span className="score-label">2048 Max Score:</span>
          <span className="score-number">{scores.game2048}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Flappy Bird Best Score:</span>
          <span className="score-number">{scores.flappyBird}</span>
        </div>
      </div>

      <div className="games-grid">
        {games.map((game, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <GameCard {...game} />
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="reset-button"
        onClick={resetScores}
      >
        Reset Scores
      </motion.button>
    </motion.div>
  );
};

export default Home;
