import { Button, Checkbox, Input, Modal, Popover, Space, Upload } from "antd";
import { useState } from "react";
import { useTraining } from "../context/TrainProvider";
import { MdOutlineFileUpload } from "react-icons/md";

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
      {trainingTypes?.map((type) => (
        <Button
          onClick={() => {
            handleTrainForm("Type", type.ID);
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

const TrainingModal = ({ addModal, isEdit, handleTrainingModal }) => {
  const [newType, setNewType] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const {
    handleTrainForm,
    addLearningData,
    trainForm,
    addTrainingType,
    trainingTypes,
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
    if (file?.status != "removed") {
      handleTrainForm("FileDescr", file);
    }
  };
  return (
    <Modal
      onCancel={() => {
        handleTrainingModal(false);
      }}
      footer={null}
      closable={false}
      open={addModal}
      title={isEdit ? "Мэдээлэл засах" : "Сургалт нэмэх"}
    >
      <div className="training-modal-container">
        <div className="training-modal-input">
          <p>Гарчиг</p>
          <Input
            name="Name"
            onChange={handleInput}
            placeholder="Сургалтын гарчигаа оруулна уу"
          />
        </div>

        <div className="training-modal-input">
          <div className="training-modal-input">
            <p>Сургалтын төрөл</p>
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
                style={
                  selectedType
                    ? { fontWeight: 400, color: "black", width: "100%" }
                    : {
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
        <Checkbox className="training-checkbox" onChange={handleCheck}>
          Файл эсэх
        </Checkbox>

        {trainForm.IsFile === "N" ? (
          <div>
            <p>Бичлэгний холбоос</p>
            <Input
              name="FileDescr"
              placeholder="https://www.youtube.com/embed/example"
              onChange={handleInput}
            />
          </div>
        ) : (
          <div className="training-file-box">
            <Upload
              onChange={handleFileChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<MdOutlineFileUpload />}>Файл хавсаргах</Button>
            </Upload>
          </div>
        )}
        <div>
          <Button
            style={{ fontWeight: 700 }}
            onClick={() => {
              handleTrainingModal(false);
            }}
          >
            Хаах
          </Button>
          <Button
            onClick={addLearningData}
            style={{ fontWeight: 700, marginLeft: 10 }}
            type="primary"
          >
            Нэмэх
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TrainingModal;
