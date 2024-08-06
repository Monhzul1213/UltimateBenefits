import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Button, Upload, Checkbox } from "antd";
import { useDiscounts } from "../context/DiscountsProvider";
import { MdOutlineFileUpload } from "react-icons/md";

const DiscountsAdd = ({ isOpen, onClose }) => {
  const { addDiscounts } = useDiscounts();
  const [discountsForm, setDiscountsForm] = useState({
    Name: "",
    Descr: "",
    Type: "",
    AvailableCount: "",
    Image: null,
    IsFile: "N",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscountsForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setDiscountsForm(prev => ({ ...prev, Image: file }));
    }
    return false;
  };
  
  const handleCheck = ({ target }) => {
    setDiscountsForm((prev) => ({ ...prev, IsFile: target.checked ? "Y" : "N" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDiscounts(discountsForm);
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
          <div className="add_header">
            ХӨНГӨЛӨЛТ УРАМШУУЛАЛ НЭМЭХ
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
              accept=".jpg,.png,.jpeg"
              customRequest={({ file }) => handleImageChange(file)}
              maxCount={1}
            >
            <Button icon={<MdOutlineFileUpload />}>Зураг хавсаргах</Button>
            </Upload>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}>
              <div className="form-actions">
                <button type="button" onClick={onClose} className="cancel-button">Болих</button>
                <button type="submit" className="submit-button">Нэмэх</button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiscountsAdd;
