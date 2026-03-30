import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TicTacToe from '../../games/TicTacToe/TicTacToe';
import MemoryGame from '../../games/MemoryGame/MemoryGame';
import RockPaperScissors from '../../games/RockPaperScissors/RockPaperScissors';
import NumberGuessingGame from '../../games/NumberGuessingGame/NumberGuessingGame';
import Hangman from '../../games/Hangman/Hangman';
import SimonSays from '../../games/SimonSays/SimonSays';
import Game2048 from '../../games/Game2048/Game2048';
import FlappyBird from '../../games/FlappyBird/FlappyBird';
import './GamePage.css';

const GamePage = () => {
  const { gameId } = useParams();

  const renderGame = () => {
    switch (gameId) {
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'memory-game':
        return <MemoryGame />;
      case 'rock-paper-scissors':
        return <RockPaperScissors />;
      case 'number-guessing':
        return <NumberGuessingGame />;
      case 'hangman':
        return <Hangman />;
      case 'simon-says':
        return <SimonSays />;
      case 'game-2048':
        return <Game2048 />;
      case 'flappy-bird':
        return <FlappyBird />;
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="game-page"
    >
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="game-content">
        {renderGame()}
      </div>
    </motion.div>
  );
};

export default GamePage;
