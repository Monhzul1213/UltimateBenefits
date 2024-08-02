import React from 'react';
import Modal from 'react-modal';

export const ClubsModal = ({ isOpen, onRequestClose, club }) => {
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
        <h2>{club.Name}</h2>
      </div>
      <div className="modal-body">
        <div className="modal-section">
          <strong>Тайлбар:</strong>
          <p>{club.Descr}</p>
        </div>
        <div className="modal-section">
          <strong>Холбоо барих:</strong>
          <p>{club.Contact}</p>
        </div>
        {/* <div className="modal-section">
          <strong>Image:</strong>
          <img src={`data:image/png;base64,${club.Image}`} alt={club.Name} style={{ maxWidth: '100%', height: 'auto' }} />
        </div> */}
      </div>
      <div className="modal-footer">
        <button onClick={onRequestClose} className="close-modal-button">Болих</button>
      </div>
    </Modal>
  );
};

export default ClubsModal;
