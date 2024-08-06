import React, { useState } from "react";
import Modal from 'react-modal';
import { Input, Button, Upload, Checkbox } from "antd";
import { useDiscounts } from "../context/DiscountsProvider";
import { MdOutlineFileUpload } from "react-icons/md";

const DiscountsAdd = ({ isOpen, onClose, EditDiscounts }) => {
  const { addDiscounts, discountsForm, setDiscountsForm, handleChange, handleImageChange } = useDiscounts();
  const [submittedForms, setSubmittedForms] = useState([]);

  if (!isOpen) return null;

  const handleCheck = ({ target }) => {
    setDiscountsForm((prev) => ({ ...prev, IsFile: target.checked ? "Y" : "N" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDiscounts(discountsForm);
    setSubmittedForms((prev) => [...prev, discountsForm]);
    setDiscountsForm({
      Name: "",
      Descr: "",
      Type: "",
      AvailableCount: "",
      Image: null,
      IsFile: "N"
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Discounts"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="add_header">
     {EditDiscounts?"ХӨНГӨЛӨЛТ УРАМШУУЛАЛ ЗАСАХ" : "ХӨНГӨЛӨЛТ УРАМШУУЛАЛ НЭМЭХ"}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}></div>
      <form onSubmit={handleSubmit}>
        <div className="training-modal-input">
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

        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Тайлбар
          </p>
          <textarea
            value={discountsForm.Descr}
            name="Descr"
            onChange={handleChange}
            placeholder="Тайлбар оруулна уу"
            rows={5}
            style={{
              width: "560px",
              height: "125px",
              padding: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 500,
              marginBottom: "5px",
              backgroundColor: "#f5f5f5"
            }}
          />
        </div>

        <Checkbox
          checked={discountsForm.IsFile === "Y"}
          className="training-checkbox"
          onChange={handleCheck}
          style={{ marginTop: "10px" }}
        >
          Сараар эсэх
        </Checkbox>

        {discountsForm.IsFile === "N" ? (
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
              Ажилласан жилийн шаардлага/сараар/
            </p>
            <Input
              size="large"
              variant="filled"
              value={discountsForm.Type}
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

        <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">Болих</button>
            <button type="submit" className="submit-button">{EditDiscounts ? "Засах" : "Нэмэх"}</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DiscountsAdd;
