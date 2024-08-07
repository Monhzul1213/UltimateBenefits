import { Button, Checkbox, Input, Modal, Popover, Space, Upload } from "antd";
import { useState } from "react";
import { useTraining } from "../context/TrainProvider";
import { MdOutlineFileUpload } from "react-icons/md";
import { alert } from "../lib/actions/alert.actions";

const content = (
  addTrainingType,
  handleTypeInput,
  newType,
  trainingTypes,
  handleTrainForm,
  setNewType,
  setSelectedType
) => {
  return (
    <div className="training-type-box">
      {trainingTypes?.map((type, index) => (
        <Button
          key={index}
          onClick={() => {
            handleTrainForm("CategoryID", type.ID);
            setSelectedType(type.Name);
          }}
          type="text"
        >
          {type.Name}
        </Button>
      ))}
      <Space.Compact>
        <Input
          value={newType}
          placeholder="Шинэ төрөл нэмэх"
          onChange={handleTypeInput}
        />
        <Button
          type="primary"
          onClick={() => {
            addTrainingType(newType);
            setNewType("");
          }}
        >
          +
        </Button>
      </Space.Compact>
    </div>
  );
};

const TrainingModal = ({
  addModal,
  isEdit,
  handleTrainingModal,
  setIsEdit,
}) => {
  const [newType, setNewType] = useState("");
  const {
    handleTrainForm,
    addLearningData,
    trainForm,
    addTrainingType,
    trainingTypes,
    clearTrainForm,
    selectedType,
    setSelectedType,
    updateLearningData,
  } = useTraining();
  const handleInput = (e) => {
    handleTrainForm(e.target.name, e.target.value);
  };
  const handleTypeInput = (e) => {
    setNewType(e.target.value);
  };
  const handleCheck = ({ target }) => {
    handleTrainForm("IsFile", target.checked ? "Y" : "N");
  };
  const handleFileChange = ({ file }) => {
    if (file?.status !== "removed") {
      handleTrainForm("FileDescr", file);
    }
  };
  const [warningMessage, setWarningMessage] = useState({});

  const validateForm = () => {
    if (!trainForm.Name) {
    }
  };

  return (
    <Modal
      onCancel={() => {
        handleTrainingModal(false);
        setSelectedType(null);
        clearTrainForm();
        setIsEdit(false);
      }}
      footer={null}
      closable={false}
      open={addModal}
    >
      <div className="training-modal-container">
        <div className="emp-modal-header">
          <h2>{isEdit ? "Мэдээлэл засах" : "Сургалт нэмэх"}</h2>
        </div>
        <div className="training-modal-input">
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
            Гарчиг
          </p>
          <Input
            size="large"
            variant="filled"
            name="Name"
            onChange={handleInput}
            value={trainForm.Name}
            placeholder="Хөдөлмөрийн дотоод журам"
          />
        </div>

        <div className="training-modal-input">
          <div className="training-modal-input">
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
              Сургалтын төрөл
            </p>
            <Popover
              placement="bottomLeft"
              content={content(
                addTrainingType,
                handleTypeInput,
                newType,
                trainingTypes,
                handleTrainForm,
                setNewType,
                setSelectedType
              )}
              trigger="click"
            >
              <Button
                size="large"
                style={
                  selectedType
                    ? { fontWeight: 400, color: "black", width: "100%" }
                    : {
                        fontSize: 15,
                        fontWeight: 300,
                        color: "gray",
                        width: "100%",
                      }
                }
              >
                {selectedType ? selectedType : "Сургалтын төрөлөө сонгоно уу"}
              </Button>
            </Popover>
          </div>
        </div>
        <Checkbox
          checked={trainForm?.IsFile === "N" ? false : true}
          className="training-checkbox"
          onChange={handleCheck}
        >
          Файл эсэх
        </Checkbox>

        {trainForm.IsFile === "N" ? (
          <div>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
              Бичлэгний холбоос
            </p>
            <Input
              size="large"
              variant="filled"
              value={isEdit ? trainForm.FileDesc : trainForm.FileDescr}
              name={isEdit ? "FileDesc" : "FileDescr"}
              placeholder="https://www.youtube.com/embed/example"
              onChange={handleInput}
            />
          </div>
        ) : (
          <div className="training-file-box">
            <Upload
              accept=".doc,.pptx,.pdf,xlsx"
              onChange={handleFileChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<MdOutlineFileUpload />}>Файл хавсаргах</Button>
              {isEdit && !trainForm.FileDescr && (
                <p style={{ textAlign: "center", marginTop: 10 }}>
                  {trainForm?.FileDesc?.split("/").pop()}
                </p>
              )}
            </Upload>
          </div>
        )}
        <div className="emp-modal-buttons">
          <Button
            size="large"
            style={{ fontWeight: 700 }}
            onClick={() => {
              handleTrainingModal(false);
              setSelectedType(null);
              clearTrainForm();
              setIsEdit(false);
            }}
          >
            Хаах
          </Button>
          {isEdit ? (
            <Button
              size="large"
              onClick={() => {
                updateLearningData(trainForm.ID);
                handleTrainingModal(false);
                setSelectedType(null);
                clearTrainForm();
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
                addLearningData();
                handleTrainingModal(false);
                setSelectedType(null);
                clearTrainForm();
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

export default TrainingModal;
