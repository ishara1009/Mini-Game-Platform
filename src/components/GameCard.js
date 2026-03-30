import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameCard = ({ title, description, icon, path, color }) => {
  return (
    <Link to={path}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-br ${color} p-6 rounded-lg shadow-lg cursor-pointer h-full transform transition hover:shadow-xl`}
      >
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200 mb-4">{description}</p>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-white font-semibold inline-flex items-center"
        >
          Play Now →
        </motion.button>
      </motion.div>
    </Link>
  );
};

export default GameCard;
