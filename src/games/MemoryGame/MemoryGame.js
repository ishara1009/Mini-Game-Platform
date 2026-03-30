import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ScoreContext } from '../../context/ScoreContext';
import './MemoryGame.css';

const MemoryGame = () => {
  const emojis = ['🍎', '🍌', '🍉', '🍒', '🍓', '🥝', '🍑', '🍍'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const { updateScore } = useContext(ScoreContext);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Check if game is won
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
      updateScore('memoryGame', 1);
    }
  }, [matched, cards.length, updateScore]);

  const resetGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (index) => {
    if (
      flipped.includes(index) ||
      matched.includes(index) ||
      flipped.length === 2
    ) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      if (
        cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji
      ) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="memory-game-container"
    >
      <h1 className="game-title">Memory Game</h1>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Matched:</span>
          <span className="stat-value">
            {matched.length / 2} / {cards.length / 2}
          </span>
        </div>
      </div>

      {gameWon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="win-message"
        >
          🎉 You Won! Moves: {moves} 🎉
        </motion.div>
      )}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`card ${
              flipped.includes(index) || matched.includes(index)
                ? 'flipped'
                : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{
                rotateY:
                  flipped.includes(index) || matched.includes(index)
                    ? 180
                    : 0,
              }}
              transition={{ duration: 0.6 }}
              className="card-inner"
            >
              <div className="card-front">?</div>
              <div className="card-back">{card.emoji}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="restart-button"
        onClick={resetGame}
      >
        {gameWon ? 'Play Again' : 'Restart Game'}
      </motion.button>
    </motion.div>
  );
};

export default MemoryGame;
