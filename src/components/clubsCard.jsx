// components/ClubsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ClubsCard = ({ image, alt, className }) => {
  return (
    <motion.div
      className={`card ${className}-card`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={image}
        alt={alt}
        className={`${className}-image`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default ClubsCard;