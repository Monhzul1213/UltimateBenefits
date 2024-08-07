import React, { useState, useEffect } from 'react';
import { useClub } from '../context/ClubsProvider';
import { Modal, Input, Button, Upload } from 'antd';
import { MdOutlineFileUpload } from 'react-icons/md';
import TextArea from 'antd/es/input/TextArea';

export const AddClubModal = ({ isOpen, onClose, isEditing }) => {
  const { addClub, handleClubForm, clubFormEdit,editClub, setClubFormEdit } = useClub();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // This effect runs when clubFormEdit changes to reset the file list
    if (isEditing) {
      setFileList([]);
    }
  }, [clubFormEdit, isEditing]);

  const handleSubmit = async () => {
 
    if (isEditing) {
      editClub(clubFormEdit.ID)
    } else {
      await addClub();
    }
    onClose();
    setFileList([]);
  };

  const handleCancel = () => {
    setFileList([]);
    onClose();
  };

  const handleImageChange = ({file }) => {
    if (file?.status !== "removed") {
      setClubFormEdit((prev)=>({...prev, Image:file}))
    }
  };

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <h2
        style={{
          fontSize: "14",
          display: "flex",
          justifyContent: "center",
          borderBottom: "solid 2px #e3eeff",
          paddingBottom: "10px",
          marginBottom: "10px"
        }}
      >
        Клуб {isEditing ? "засах" : "нэмэх"}
      </h2>
      <div>
        <label>Клубын нэр</label>
        <Input
          name="Name"
          onChange={handleClubForm}
          value={clubFormEdit.Name}
          size="large"
          placeholder="Клубын нэрээ оруулна уу"
          required
        />
      </div>
      <div>
        <label>Тайлбар</label>
        <TextArea
          name="Descr"
          onChange={handleClubForm}
          value={clubFormEdit.Descr}
          size="large"
          placeholder="Тайлбар оруулна уу"
          required
        />
      </div>
      <div>
        <label>Утасны дугаар</label>
        <Input
          name="Contact"
          onChange={handleClubForm}
          value={clubFormEdit.Contact}
          size="large"
          placeholder="Утасны дугаараа оруулна уу"
          required
        />
      </div>
      <div>
        <label>Зураг</label>
        <div className="training-file-box">
          <Upload
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
            beforeUpload={() => false}
            maxCount={1}
            fileList={clubFormEdit.Image ? [clubFormEdit.Image] : []}
          >
            <Button icon={<MdOutlineFileUpload />}>Зураг хавсаргах</Button>
          </Upload>
        </div>
      </div>
      <div className="add-footer">
        <Button size="large" onClick={handleCancel}>Болих</Button>
        <Button type="primary" size="large" style={{ margin: 8 }} onClick={handleSubmit}>
          { isEditing ? "Өөрчлөлт хадгалах" : "Нэмэх"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddClubModal;
