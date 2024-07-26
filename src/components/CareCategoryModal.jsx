import { Button, Input, Modal, Upload } from "antd";
import { useCare } from "../context/CareProvider";
import { MdOutlineFileUpload } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";

const CareCategoryModal = ({ isEdit, open, handleAddModal }) => {
  const {
    handleCategoryForm,
    careCategoryForm,
    createCareCategory,
    clearForm,
  } = useCare();
  const handleInput = (e) => {
    handleCategoryForm(e.target.name, e.target.value);
  };
  const handleFileChange = ({ file }) => {
    if (file?.status !== "removed") {
      handleCategoryForm("Image", file);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        handleAddModal(false);
        clearForm();
      }}
      footer={null}
      closable={false}
    >
      <div className="training-modal-container">
        <div className="emp-modal-header">
          <h2>{isEdit ? "Мэдээлэл засах" : "Хангамж нэмэх"}</h2>
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Гарчиг
          </p>
          <Input
            size="large"
            variant="filled"
            name="Name"
            placeholder="Мөнгөн тэтгэмж"
            onChange={handleInput}
          />
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Шаарлагтай ажилласан хугацаа /сараар/
          </p>
          <Input
            type="number"
            size="large"
            variant="filled"
            name="AvailableMonth"
            placeholder="12"
            onChange={handleInput}
          />
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Тайлбар
          </p>
          <TextArea
            name="Descr"
            rows={4}
            size="large"
            variant="filled"
            placeholder="1 с дээш жил ажилласан ажилтнуудыг хувийн эрүүл мэндийн даатгалд хамруулан, 50 хувийн хураамжийг байгууллага төлнө"
            onChange={handleInput}
          />
        </div>
        <div className="training-file-box">
          <Upload
            accept=".png, .jpeg,.jpg"
            onChange={handleFileChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<MdOutlineFileUpload />}>Зураг хавсаргах</Button>
          </Upload>
        </div>
        <div className="emp-modal-buttons">
          <Button
            size="large"
            style={{ fontWeight: 700 }}
            onClick={() => {
              handleAddModal(false);
              clearForm();
            }}
          >
            Хаах
          </Button>
          {isEdit ? (
            <Button
              size="large"
              onClick={() => {}}
              style={{ fontWeight: 700, marginLeft: 10 }}
              type="primary"
            >
              Өөрчлөлт хадгалах
            </Button>
          ) : (
            <Button
              size="large"
              onClick={() => {
                createCareCategory();
                clearForm();
                handleAddModal(false);
              }}
              style={{ fontWeight: 700, marginLeft: 10 }}
              type="primary"
            >
              Нэмэх
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CareCategoryModal;
