import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center h-screen bg-dark"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full"
      />
    </motion.div>
  );
};

export default Loader;
