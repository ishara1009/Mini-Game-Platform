import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerStats, setWinnerStats] = useState(null);
  const { updateScore } = useContext(ScoreContext);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinnerStats(result);
      updateScore('ticTacToe', 1);
    }

    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinnerStats(null);
  };

  const renderSquare = (index) => {
    const isWinningSquare = winner && winner.line.includes(index);

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`square ${isWinningSquare ? 'winning-square' : ''}`}
        onClick={() => handleClick(index)}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: board[index] ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-3xl font-bold"
        >
          {board[index]}
        </motion.span>
      </motion.button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="tic-tac-toe-container"
    >
      <h1 className="game-title">Tic Tac Toe</h1>

      <div className="game-info">
        {winner ? (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="winner-text"
          >
            Player {winner.winner} Wins!
          </motion.p>
        ) : isBoardFull ? (
          <p className="draw-text">It's a Draw!</p>
        ) : (
          <p className="current-player">
            Current Player: <span className="player-mark">{isXNext ? 'X' : 'O'}</span>
          </p>
        )}
      </div>

      <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderSquare(index))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="restart-button"
        onClick={handleReset}
      >
        Restart Game
      </motion.button>
    </motion.div>
  );
};

export default TicTacToe;
