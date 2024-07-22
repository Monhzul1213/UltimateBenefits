import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ClubsModal = ({ isOpen, onClose, club }) => {
  if (!isOpen || !club) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{club.title}</h2>
          <p>{club.description}</p>
          
          <h3>Клубын мэдээлэл</h3>
          <p><strong>Category:</strong> {club.category}</p>
          <p><strong>Facebook:</strong> <a href={club.fbLink} target="_blank" rel="noopener noreferrer">Club Facebook Page</a></p>
          
          <h3>Members :</h3>
          {club.members.map((member, index) => (
            <div key={index} className="member-info">
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Position:</strong> {member.position}</p>
              <p><strong>Company:</strong> {member.company}</p>
              <p><strong>Telephone:</strong> {member.telephone}</p>
            </div>
          ))}
          
          <button onClick={onClose}>Close</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClubsModal;