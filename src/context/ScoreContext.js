import React, { createContext, useState, useCallback, useEffect } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    ticTacToe: 0,
    memoryGame: 0,
    rockPaperScissors: 0,
    numberGuessingGame: 0,
    hangman: 0,
    simonSays: 0,
    game2048: 0,
    flappyBird: 0,
    totalGames: 0,
  });

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('gameScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  // Save scores to localStorage whenever they change
  const updateScore = useCallback((game, increment = 1) => {
    setScores((prevScores) => {
      const newScores = {
        ...prevScores,
        [game]: prevScores[game] + increment,
        totalGames: prevScores.totalGames + 1,
      };
      localStorage.setItem('gameScores', JSON.stringify(newScores));
      return newScores;
    });
  }, []);

  const resetScores = useCallback(() => {
    const emptyScores = {
      ticTacToe: 0,
      memoryGame: 0,
      rockPaperScissors: 0,
      numberGuessingGame: 0,
      hangman: 0,
      simonSays: 0,
      game2048: 0,
      flappyBird: 0,
      totalGames: 0,
    };
    setScores(emptyScores);
    localStorage.setItem('gameScores', JSON.stringify(emptyScores));
  }, []);

  const value = {
    scores,
    updateScore,
    resetScores,
  };

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  );
};
