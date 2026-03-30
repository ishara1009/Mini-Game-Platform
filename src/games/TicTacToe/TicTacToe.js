import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerStats, setWinnerStats] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
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
      <div className="game-header">
        <h1 className="game-title">Tic Tac Toe</h1>
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
            <h2>Tic Tac Toe - How to Play</h2>
            
            <div className="help-section">
              <h3>About the Game</h3>
              <p>A classic 2-player strategy game where you try to get three of your marks (X or O) in a row - horizontally, vertically, or diagonally - before your opponent does!</p>
            </div>

            <div className="help-section">
              <h3>How to Play</h3>
              <ul>
                <li><strong>Players Take Turns:</strong> Player 1 is X, Player 2 is O</li>
                <li><strong>Click Empty Squares:</strong> Click any empty cell on the 3x3 grid</li>
                <li><strong>Win Condition:</strong> Get 3 marks in a row to win</li>
                <li><strong>Draw:</strong> If all 9 squares are filled with no winner, it's a draw</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Winning Patterns</h3>
              <ul>
                <li>3 in a row (horizontal)</li>
                <li>3 in a column (vertical)</li>
                <li>3 diagonal across the board</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>Tips for Winning</h3>
              <ul>
                <li>✓ Start in the center or corners for strategic advantage</li>
                <li>✓ Block your opponent's potential winning moves</li>
                <li>✓ Create multiple winning opportunities</li>
                <li>✓ Control the center and corners early</li>
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
