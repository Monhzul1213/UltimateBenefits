import { Button, Input, Modal } from "antd";
import { useCare } from "../context/CareProvider";
import MyEditor from "./MyEditor";

const CareDetailModal = ({ open, handleDetailModal }) => {
  let fileName = "";
  const {
    handleCategoryForm,
    careCategoryForm,
    createCareCategory,
    clearForm,
    categoryEdit,
    editCareCategory,
    editImg,
  } = useCare();
  const handleInput = (e) => {
    handleCategoryForm(e.target.name, e.target.value);
  };
  const handleFileChange = ({ file }) => {
    if (file?.status !== "removed") {
      handleCategoryForm("Image", file);
      fileName = file.name;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        handleDetailModal(false);
      }}
      footer={null}
      closable={false}
    >
      <div className="training-modal-container">
        <div className="emp-modal-header">
          <h2>
            {categoryEdit ? "Мэдээлэл засах" : "Дэлгэрэнгүй мэдээлэл нэмэх"}
          </h2>
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Гарчиг
          </p>
          <Input
            value={careCategoryForm.Name}
            size="large"
            variant="filled"
            name="Name"
            placeholder="Мөнгөн тэтгэмж"
            onChange={handleInput}
          />
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Агуулга
          </p>
          <MyEditor />
        </div>
        <div className="emp-modal-buttons">
          <Button
            size="large"
            style={{ fontWeight: 700 }}
            onClick={() => {
              handleDetailModal(false);
              clearForm();
            }}
          >
            Хаах
          </Button>
          {categoryEdit ? (
            <Button
              size="large"
              onClick={() => {
                editCareCategory(careCategoryForm?.ID);
                clearForm();
                handleDetailModal(false);
              }}
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
                handleDetailModal(false);
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

export default CareDetailModal;
