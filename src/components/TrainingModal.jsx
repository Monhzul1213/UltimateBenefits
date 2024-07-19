import { Button, Modal, Upload } from "antd";
import { useState } from "react";

const TrainingModal = ({ addModal, isEdit }) => {
  const [file, setFile] = useState();
  const handleFileChange = ({ file }) => {
    if (file?.status != "removed") {
      setFile(file);
    }
  };
  return (
    <Modal
      footer={null}
      closable={false}
      open={addModal}
      title={isEdit ? "Мэдээлэл засах" : "Сургалт нэмэх"}
    >
      <div>
        <Upload
          onChange={handleFileChange}
          beforeUpload={() => false}
          maxCount={1}
        >
          <Button>Файл хавсаргах</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default TrainingModal;
