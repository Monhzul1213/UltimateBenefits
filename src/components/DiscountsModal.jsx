import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaXmark } from "react-icons/fa6";

const DiscountsModal = ({ isOpen, onRequestClose, discount }) => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  if (!discount) return null;

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleContextMenuOptionClick = (option) => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleModalClick = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Discounts"
      className="modal-content"
      overlayClassName="modal-overlay"
      onClick={handleModalClick}
    >
      <div className="detail1-container">
      <h2>{discount.Name}</h2>
        <div onClick={onRequestClose} className="detail-close-button">
          <FaXmark size={30} />
        </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}></div>
      <div className="modal-body" onContextMenu={handleRightClick}>
        <div className="modal-section">
          <strong>Тайлбар</strong>
          <p>{discount.Descr}</p>
        </div>
        <div className="modal-section">
          <strong>Ажилласан жилийн шаардлага /сараар/</strong>
          <p>{discount.Type}</p>
        </div>
        <div className="modal-section">
          <strong>Хэдэн удаа</strong>
          <p>{discount.AvailableCount}</p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}></div>
      <div className="form-actions">
        <button onClick={onRequestClose} className="close-modal-button">Хаах</button>
      </div>
    </Modal>
  );
};

export default DiscountsModal;
