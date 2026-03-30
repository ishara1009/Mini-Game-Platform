import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TicTacToe from '../../games/TicTacToe/TicTacToe';
import MemoryGame from '../../games/MemoryGame/MemoryGame';
import './GamePage.css';

const GamePage = () => {
  const { gameId } = useParams();

  const renderGame = () => {
    switch (gameId) {
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'memory-game':
        return <MemoryGame />;
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
