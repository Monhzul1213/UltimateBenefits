import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClub } from '../context/ClubsProvider';

export const AddClubModal = ({ isOpen, onClose }) => {
  const { addClub } = useClub();
  const [clubForm, setClubForm] = useState({
    Name: '',
    Descr: '',
    Contact: '',
    Image: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setClubForm(prev => ({ ...prev, Image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in clubForm) {
      formData.append(key, clubForm[key]);
    }
    await addClub(formData);
    onClose();
  };

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
          <h2>Шинэ клуб нэмэх</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Name">Клубын нэр</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={clubForm.clubName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Descr">Тайлбар</label>
              <textarea
                id="Descr"
                name="Descr"
                value={clubForm.clubDescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Contact">Утасны дугаар</label>
              <input
                type="tel"
                id="Contact"
                name="Contact"
                value={clubForm.clubContact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Image">Зураг</label>
              <input
                type="File"
                id="Image"
                name="Image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={onClose} className="cancel-button">Болих</button>
              <button type="submit" className="submit-button">Нэмэх</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddClubModal;