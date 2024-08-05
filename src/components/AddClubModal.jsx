import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClub } from '../context/ClubsProvider';
import { Input, Button } from 'antd';
import Upload from 'antd/es/upload/Upload';
import { MdOutlineFileUpload } from 'react-icons/md';
import TextArea from 'antd/es/input/TextArea';

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
    setClubForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ file }) => {
    if (file?.status !== 'removed') {
      setClubForm((prev) => ({ ...prev, Image: file }));
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

            <div className="add-header">
              <h2>ШИНЭ КЛУБ НЭМЭХ</h2>
              <button className="close-button" onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Name">Клубын нэр</label>
                <Input
                  variant='filled'
                  placeholder='Клубын нэрээ оруулна уу'
                  type="text"
                  id="Name"
                  name="Name"
                  value={clubForm.Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Descr">Тайлбар</label>
                <TextArea
                  variant="filled"
                  placeholder='Тайлбар оруулна уу'
                  id="Descr"
                  name="Descr"
                  value={clubForm.Descr}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Contact">Утасны дугаар</label>
                <Input
                  variant='filled'
                  placeholder='Утасны дугаараа оруулна уу'
                  type="tel"
                  id="Contact"
                  name="Contact"
                  value={clubForm.Contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="training-file-box">
                <Upload
                  accept=".png, .jpeg,.jpg"
                  onChange={handleImageChange}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button icon={<MdOutlineFileUpload />}>Зураг хавсаргах</Button>
                </Upload>
              </div>
              <div className="form-actions">
                <Button size='large' onClick={onClose}>Болих</Button>
                <Button type="primary" size='large' htmlType="submit">Нэмэх</Button>
              </div>
            </form>
        </motion.div>

        
      </motion.div>
    </AnimatePresence>
  );
};

export default AddClubModal;
