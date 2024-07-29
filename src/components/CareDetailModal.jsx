import { Button, Input, Modal } from "antd";
import { useCare } from "../context/CareProvider";
import MyEditor from "./MyEditor";

const CareDetailModal = ({ open, handleDetailModal }) => {
  let fileName = "";
  const {
    handleDetailForm,
    careDetailForm,
    createCareDetail,
    clearDetailForm,
    detailEdit,
    editCareDetail,
  } = useCare();
  const handleInput = (e) => {
    handleDetailForm(e.target.name, e.target.value);
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
            {detailEdit ? "Мэдээлэл засах" : "Дэлгэрэнгүй мэдээлэл нэмэх"}
          </h2>
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Гарчиг
          </p>
          <Input
            value={careDetailForm.Name}
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
          <MyEditor
            handleDetailForm={handleDetailForm}
            value={careDetailForm.Text}
          />
        </div>
        <div className="emp-modal-buttons">
          <Button
            size="large"
            style={{ fontWeight: 700 }}
            onClick={() => {
              handleDetailModal(false);
              clearDetailForm();
            }}
          >
            Хаах
          </Button>
          {detailEdit ? (
            <Button
              size="large"
              onClick={() => {
                editCareDetail(careDetailForm?.ID);
                clearDetailForm();
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
                createCareDetail();
                clearDetailForm();
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
