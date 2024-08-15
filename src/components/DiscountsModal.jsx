import React, { useState } from 'react';
import { Modal } from 'antd';
import { FaXmark } from "react-icons/fa6";
import { useDiscounts } from "../context/DiscountsProvider";
//import { tuya, bataa } from '../assets';

const DiscountsModal = ({ isOpen, onRequestClose, discount }) => {
  const [contextMenu, setContextMenu] = useState();
  const { discountsForm } = useDiscounts();

  if (!discount) return null;

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu();
  };

  const handleContextMenuOptionClick = (option) => {
    setContextMenu();
  };

  const handleModalClick = () => {
    setContextMenu();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onRequestClose}
      contentLabel="Discounts"
      className="discounts-modal-content"
      onClick={handleModalClick}
      width={1000}
      footer={null}
      closable={false} 
    >
      <div className="modal-body">
        <div className="discounts-modal-image">
          <img src={`data:image/png;base64,${discount.Image}`} alt={discount.Name} />
        </div>
        <section>
          <div className="discount-modal-body">
            <div className="discounts-detail-container">
              <h2>{discount.Name}</h2>
              <div onClick={onRequestClose} className="discounts-close-button">
                <FaXmark size={30} />
              </div>
            </div>

            <div className="discounts-modal-body" onContextMenu={handleRightClick}>
              <div className="modal-section1">
                <strong>МЭДЭЭЛЭЛ</strong>
                <p style={{ whiteSpace: "pre-wrap" }}>{discount.Descr}</p>
              </div>

              {discountsForm.Type === "0" ? (
                <div className="modal-section1">
                  <strong>Шаардлагтай ажилласан хугацаа /сараар/</strong>
                  <p>{discount.AvailableCount}</p>
                </div>
              ) : (
                <div className="modal-section1">
                  <strong>Хэдэн удаа</strong>
                  <p>{discount.AvailableCount}</p>
                </div>
              )}
              {/* <div className="modal-section1">
              <strong>ӨМНӨХ САРЫН ШИЛДЭГ АЖИЛТНУУД</strong>
              <div style={{ display: 'flex', gap: '30px', paddingTop: '10px' }}>
                <div className="employee-photo-container">
                  <img className="employee-photo" src={tuya} alt="Software Development" />
                  <p>Tuya </p>
                  <p>Software</p>
                  <p>Development</p>
                </div>
                <div className="employee-photo-container">
                  <img className="employee-photo" src={bataa} alt="Software Operation" />
                  <p>Bataa </p>
                  <p>Software</p>
                  <p>Operation</p>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default DiscountsModal;
