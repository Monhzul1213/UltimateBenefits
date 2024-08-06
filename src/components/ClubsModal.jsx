import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useClub } from '../context/ClubsProvider';
import { Button } from 'antd/es/radio';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';

export const ClubsModal = ({ isOpen, onRequestClose, club,isEditing,setIsEditing }) => {
  const { editClub, clubFormEdit, setClubFormEdit } = useClub();

  useEffect(() => {
    if (club) {
      setClubFormEdit(club);
    }
  }, [club, setClubFormEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubFormEdit(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editClub(clubFormEdit);
    setIsEditing(false);
    onRequestClose();
  };

  if (!club) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Club Information"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>{isEditing ? "Мэдээлэл засах" : club.Name}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
            <div className="modal-section">
            <strong>Тайлбар:</strong>
            {isEditing ? (
              <TextArea
                name="Descr" 
                value={clubFormEdit.Descr} 
                onChange={handleInputChange}
              />
            ) : (
              <p>{club.Descr}</p>
            )}
          </div>
          <div className="modal-section">
            <strong>Холбогдох дугаар:</strong>
            {isEditing ? (
              <Input
                type="number" 
                name="Contact" 
                value={clubFormEdit.Contact} 
                onChange={handleInputChange}
              />
            ) : (
              <p>{club.Contact}</p>
            )}
          </div>
        </div>
        <div className="modal-footer">
          {isEditing ? (
            <>
              <Button type="Button" onClick={() => setIsEditing(false)}>Цуцлах</Button>
              <Button type="submit">Өөрчлөлт хадгалах</Button>
              
            </>
          ) : (
            <>
              <Button type="Button" onClick={onRequestClose}>Болих</Button>
           
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ClubsModal;
