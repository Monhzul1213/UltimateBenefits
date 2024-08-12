import React, { useState } from "react";
import Modal from 'react-modal';
import { Input, Button, Upload, Checkbox } from "antd";
import { useDiscounts } from "../context/DiscountsProvider";
import { MdOutlineFileUpload } from "react-icons/md";

const DiscountsAdd = ({ isOpen, onClose, EditDiscounts }) => {
  const { addDiscounts, discountsForm, setDiscountsForm, handleChange, handleImageChange, editDiscounts } = useDiscounts();
  const [submittedForms, setSubmittedForms] = useState([]);

  if (!isOpen) return null;

  const handleCheck = ({ target }) => {
    setDiscountsForm((prev) => ({ ...prev, Type: target.checked ? "1" : "0" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EditDiscounts) {
     editDiscounts(discountsForm.ID);
    } else {
     addDiscounts(discountsForm);
    }
    setSubmittedForms((prev) => [...prev, discountsForm]);
    setDiscountsForm({
      Name: "",
      Descr: "",
      Type: "0",
      AvailableCount: "",
      Image: null,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Discounts"
      className="discounst-modal-content1"
      overlayClassName="modal-overlay"
    >
      <div className="add_header">
        {EditDiscounts ? "Хөнгөлөлт урамшуулал засах" : "Хөнгөлөлт урамшуулал нэмэх"}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="dis-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Хөнгөлөлт, урамшууллын нэр
          </p>
          <Input
            size="large"
            variant="filled"
            value={discountsForm.Name}
            name="Name"
            onChange={handleChange}
            placeholder="Хөнгөлөлт, урамшууллын нэрээ оруулна уу"
          />
        </div>

        <div className="dis-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
          Мэдээлэл
          </p>
          <textarea
            value={discountsForm.Descr}
            name="Descr"
            onChange={handleChange}
            placeholder="Мэдээллээ оруулна уу"
            rows={5}
            style={{
              width: "560px",
              height: "100px",
              padding: "8px",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 500,
              marginBottom: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              color: "rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>

        <div className="dis-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
          Нэмэлт мэдээлэл
          </p>
          <textarea
            value={discountsForm.Descr}
            name="Descr"
            onChange={handleChange}
            placeholder="Нэмэлт мэдээллээ оруулна уу"
            rows={5}
            style={{
              width: "560px",
              height: "80px",
              padding: "8px",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 500,
              marginBottom: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              color: "rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>

        <Checkbox
          checked={discountsForm.Type === "1"}
          className="training-checkbox"
          onChange={handleCheck}
          style={{ marginTop: "10px" }}
        >
          Сараар эсэх
        </Checkbox>

        {discountsForm.Type == "0" ? (
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
              Хэдэн удаа
            </p>
            <Input
              size="large"
              variant="filled"
              value={discountsForm.AvailableCount}
              name="AvailableCount"
              onChange={handleChange}
              placeholder=""
            />
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Шаардлагтай ажилласан хугацаа /сараар/
            </p>
            <Input
              size="large"
              variant="filled"
              value={discountsForm.AvailableCount}
              name="Type"
              onChange={handleChange}
              placeholder="Ажилласан сараа оруулна уу"
            />
          </div>
        )}

        <div className="training-file-box" style={{ marginTop: "10px" }}>
          <Upload
            beforeUpload={() => false}
            accept=".jpg,.png,.jpeg"
            onChange={handleImageChange}
            maxCount={1}
          >
            <Button icon={<MdOutlineFileUpload />}>Зураг хавсаргах</Button>
          </Upload>
        </div>
        <div className="dis-modal-buttons">
          <button size="large" style={{ fontWeight: 700 }}type="button" onClick={onClose} className="cancel-button">Болих</button>
          <button size="large" style={{ fontWeight: 700 }}type="submit" className="submit-button">{EditDiscounts ? "Өөрчлөлтийг хадгалах" : "Нэмэх"}</button>
        </div>
      </form>
    </Modal>
  );
};

export default DiscountsAdd;
