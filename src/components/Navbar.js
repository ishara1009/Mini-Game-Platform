import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScoreContext } from '../context/ScoreContext';

const Navbar = () => {
  const { scores } = useContext(ScoreContext);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary to-secondary px-6 py-4 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
        >
          🎮 {process.env.REACT_APP_NAME}
        </Link>

        <div className="flex gap-8 items-center">
          <div className="text-white text-sm">
            <p>🏆 Total Games: <span className="font-bold">{scores.totalGames}</span></p>
          </div>

          <Link
            to="/"
            className="text-white hover:text-gray-200 transition-colors font-medium"
          >
            Home
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
