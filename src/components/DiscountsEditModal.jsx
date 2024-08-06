import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useDiscounts } from "../context/DiscountsProvider";

const DiscountsEditModal = ({
  editModal,
  setEditModal,
  selectedTrainType,
  prevName,
  setPrevName,
}) => {
  const handleInput = (e) => {
    setPrevName(e.target.value);
  };
  const { updateDiscounts } = useDiscounts();
  return (
    <Modal
      open={editModal}
      onCancel={() => {
        setEditModal(false);
      }}
      footer={null}
      closable={false}
    >
      <div className="training-modal-container">
        <div className="emp-modal-header">
          <h2>Сургалтын категори засах</h2>
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Гарчиг
          </p>
          <Input
            value={prevName}
            size="large"
            variant="filled"
            name="Name"
            onChange={handleInput}
            placeholder="Ажлын байрны ур чадвар"
          />
        </div>
        <div className="emp-modal-buttons">
          <Button
            size="large"
            style={{ fontWeight: 700 }}
            onClick={() => {
              setEditModal(false);
            }}
          >
            Хаах
          </Button>
          <Button
            size="large"
            onClick={() => {
              updateTrainingType(selectedTrainType, prevName);
              setEditModal(false);
            }}
            style={{ fontWeight: 700, marginLeft: 10 }}
            type="primary"
          >
            Өөрчлөлт хадгалах
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TrainEditModal;
