import React, { useState } from 'react';
import Modal from 'react-modal';

export const ClubsModal = ({ isOpen, onRequestClose, club }) => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  if (!club) return null;

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleContextMenuOptionClick = (option) => {
    console.log(`Selected option: ${option}`);
    setContextMenu({ visible: false, x: 0, y: 0 });
    // Add custom logic for each option here
  };

  const handleModalClick = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Club Information"
      className="modal-content"
      overlayClassName="modal-overlay"
      onClick={handleModalClick}
    >
      <div className="modal-header" onContextMenu={handleRightClick}>
        <h2>{club.Name}</h2>
        <button onClick={onRequestClose} className="close-button-header">X</button>
      </div>
      <div className="modal-body" onContextMenu={handleRightClick}>
        <div className="modal-section">
          <strong>Description:</strong>
          <p>{club.Descr}</p>
        </div>
        <div className="modal-section">
          <strong>Contact:</strong>
          <p>{club.Contact}</p>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onRequestClose} className="close-modal-button">Болих</button>
      </div>
      {contextMenu.visible && (
        <ul
          className="context-menu"
          style={{ top: `${contextMenu.x}px`, left: `${contextMenu.y}px` }}
        >
          <li onClick={() => handleContextMenuOptionClick('Option 1')}>Option 1</li>
          <li onClick={() => handleContextMenuOptionClick('Option 2')}>Option 2</li>
        </ul>
      )}
    </Modal>
  );
};

export default ClubsModal;
