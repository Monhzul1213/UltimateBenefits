import { Button, Checkbox, Input, Modal, Upload } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRule } from "../../context/RuleProvider";

const RuleAddModal = ({ open, handleAddModal, id }) => {
  let fileName = "";
  const {
    createRuleDetail,
    clearDetailForm,
    ruleDetailForm,
    handleRuleDetailForm,
    editDetail,
    editRuleDetail,
  } = useRule();
  const handleFileChange = ({ file }) => {
    if (file?.status !== "removed") {
      handleRuleDetailForm("FileDesc", file);
      fileName = file.name;
    }
  };
  const handleInput = (e) => {
    handleRuleDetailForm(e.target.name, e.target.value);
  };
  const handleCheck = ({ target }) => {
    console.log(target.checked);
    handleRuleDetailForm("IsFile", target.checked ? "Y" : "N");
  };
  return (
    <Modal
      open={open}
      onCancel={() => {
        handleAddModal(false);
        clearDetailForm();
      }}
      footer={null}
      closable={false}
    >
      <div className="training-modal-container">
        <div className="emp-modal-header">
          <h2>{editDetail ? "Мэдээлэл засах" : "Дүрэм журам нэмэх"}</h2>
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Гарчиг
          </p>
          <Input
            value={ruleDetailForm.Name}
            size="large"
            variant="filled"
            name="Name"
            placeholder="Дүрэм журам"
            onChange={handleInput}
          />
        </div>
        <Checkbox
          checked={ruleDetailForm.IsFile === "N" ? false : true}
          className="training-checkbox"
          onChange={handleCheck}
        >
          Файл эсэх
        </Checkbox>
        {ruleDetailForm.IsFile === "Y" ? (
          <div className="training-file-box">
            <Upload
              accept=".doc,.pptx,.pdf,.xlsx"
              onChange={handleFileChange}
              beforeUpload={() => false}
              maxCount={1}
              fileList={
                ruleDetailForm.FileDesc ? [ruleDetailForm.FileDesc] : []
              }
            >
              {editDetail ? (
                <Button icon={<MdOutlineFileUpload />}>Файл солих</Button>
              ) : (
                <Button icon={<MdOutlineFileUpload />}>Файл хавсаргах</Button>
              )}
            </Upload>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
              Бичлэгний холбоос
            </p>
            <Input
              size="large"
              variant="filled"
              value={ruleDetailForm.FileDesc}
              name="FileDesc"
              placeholder="https://www.youtube.com/embed/example"
              onChange={handleInput}
            />
          </div>
        )}
        <div className="emp-modal-buttons">
          <Button
            size="large"
            style={{ fontWeight: 700 }}
            onClick={() => {
              handleAddModal(false);
              clearDetailForm();
            }}
          >
            Хаах
          </Button>
          {editDetail ? (
            <Button
              size="large"
              onClick={() => {
                editRuleDetail(ruleDetailForm.ID);
                clearDetailForm();
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
                createRuleDetail(id);
                handleAddModal(false);
                clearDetailForm();
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

export default RuleAddModal;
