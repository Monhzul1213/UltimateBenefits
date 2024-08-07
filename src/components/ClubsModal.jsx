import React, { useState, useEffect } from 'react';
import { Modal, Button } from "antd";
import { useClub } from '../context/ClubsProvider';
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
      open={isOpen}
      onCancel={onRequestClose}
      contentLabel="Club Information"
      footer={null}
      closable={false}
    >
      <div className="modal-header">
        <h2> {club.Name}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
            <div className="modal-section">
            <strong>Тайлбар:</strong>
              <p>{club.Descr}</p>
          </div>
          <div className="modal-section">
            <strong>Холбогдох дугаар:</strong>
              <p>{club.Contact}</p>
            </div>
        </div>
        <div className="modal-footer">
          <Button size='large' onClick={onRequestClose}>Болих</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ClubsModal;
