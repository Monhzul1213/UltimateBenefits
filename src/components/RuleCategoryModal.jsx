import { Button, Input, Modal, Upload } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRule } from "../context/RuleProvider";

const RuleCategoryModal = ({ open, handleAddModal }) => {
  let fileName = "";
  const {
    createRuleCategory,
    handleCategoryForm,
    ruleCategoryForm,
    isEdit,
    clearCategoryForm,
    editRuleCategory,
  } = useRule();
  const handleFileChange = ({ file }) => {
    if (file?.status !== "removed") {
      handleCategoryForm("Image", file);
      fileName = file.name;
    }
  };
  const handleInput = (e) => {
    handleCategoryForm("Name", e.target.value);
  };
  return (
    <Modal
      open={open}
      onCancel={() => {
        handleAddModal(false);
        clearCategoryForm();
      }}
      footer={null}
      closable={false}
    >
      <div className="training-modal-container">
        <div className="emp-modal-header">
          <h2>{isEdit ? "Мэдээлэл засах" : "Дүрэм журам нэмэх"}</h2>
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Гарчиг
          </p>
          <Input
            value={ruleCategoryForm?.Name}
            size="large"
            variant="filled"
            name="Name"
            placeholder="Дүрэм журам"
            onChange={handleInput}
          />
        </div>
        <p style={{ fontSize: 15, fontWeight: 500 }}>Icon</p>
        <div className="training-file-box">
          <Upload
            accept=".png, .jpeg,.jpg"
            onChange={handleFileChange}
            beforeUpload={() => false}
            maxCount={1}
            fileList={ruleCategoryForm.Image ? [ruleCategoryForm.Image] : []}
          >
            {isEdit ? (
              <Button icon={<MdOutlineFileUpload />}>Зураг солих</Button>
            ) : (
              <Button icon={<MdOutlineFileUpload />}>Зураг хавсаргах</Button>
            )}
          </Upload>
        </div>
        <div className="emp-modal-buttons">
          <Button
            size="large"
            style={{ fontWeight: 700 }}
            onClick={() => {
              handleAddModal(false);
              clearCategoryForm();
            }}
          >
            Хаах
          </Button>
          {isEdit ? (
            <Button
              size="large"
              onClick={() => {
                editRuleCategory();
                clearCategoryForm();
                handleAddModal(false);
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
                createRuleCategory();
                clearCategoryForm();
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

export default RuleCategoryModal;
