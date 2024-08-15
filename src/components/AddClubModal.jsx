import React, { useState, useEffect } from 'react';
import { useClub } from '../context/ClubsProvider';
import { Modal, Input, Button, Upload, Calendar } from 'antd';
import { MdOutlineFileUpload } from 'react-icons/md';
import TextArea from 'antd/es/input/TextArea';

export const AddClubModal = ({ isOpen, onClose, isEditing }) => {
  const { addClub, handleClubForm, clubFormEdit, editClub, setClubFormEdit } = useClub();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (isEditing) {
      setFileList([]);
    }
  }, [clubFormEdit, isEditing]);

  const handleSubmit = async () => {
    if (isEditing) {
      editClub(clubFormEdit.ID);
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

  const handleImageChange = ({ file }) => {
    if (file?.status !== 'removed') {
      setClubFormEdit((prev) => ({ ...prev, Image: file }));
    }
  };

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <h2
        style={{
          fontSize: 21, 
          display: 'flex',
          justifyContent: 'center',
          borderBottom: 'solid 2px #e3eeff',
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        Клуб {isEditing ? 'засах' : 'нэмэх'}
      </h2>
      <div className="club-modal-inputs">
        <label>Клубын нэр</label>
        <Input
          name="Name"
          variant="filled"
          onChange={handleClubForm}
          value={clubFormEdit.Name}
          size="large"
          placeholder="Клубын нэрээ оруулна уу"
          required
        />
      </div>
      <div className='club-image'>
      <div style={{width:'50%'}}>
      <label style={{ fontWeight: 500, fontSize: '15px' }}>Клубын зургууд</label>
        <div className="training-file-box">
        
          <Upload
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
            beforeUpload={() => false}
            maxCount={1}
            fileList={clubFormEdit.Image  ? [clubFormEdit.Image] : []}
          >
            <Button icon={<MdOutlineFileUpload />}>
              {isEditing ? 'Зураг солих' : 'Зураг хавсаргах'}
            </Button>
          </Upload>
        </div>
      </div>
     <div style={{width:'50%'}}>
        <label style={{ fontWeight: 500, fontSize: '15px' }}>Клубын бусад зургууд</label>
        <div className="training-file-box">
        
          <Upload
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
            beforeUpload={() => false}
            maxCount={1}
            fileList={clubFormEdit.Image ? [clubFormEdit.Image] : []}
          >
            <Button icon={<MdOutlineFileUpload />}>
              {isEditing ? 'Зураг солих' : 'Зураг хавсаргах'}
            </Button>
          </Upload>
        </div>
      </div>
    </div>
    <div className='club-schedule-input'>
    <div>
    <label style={{ fontWeight: 500, fontSize: '15px' }}>Хуваарь</label>
      <div className="club-schedule">
        <div style={{ margin: '0 auto' }}>
          <Calendar
            fullscreen={false}
            mode="month"
            className="border rounded-md"
          />
          </div>
         </div>
        </div>
      <div>
        <label style={{fontWeight:'500' , fontSize:'15'}}>Клубын дэлгэрэнгүй</label>
      <div className="club-modal-inputs">
        <TextArea
          style={{
            width: '270px',
            padding: 10,
          }}
          name="Descr"
          variant="filled"
          onChange={handleClubForm}
          value={clubFormEdit.Descr}
          size="large"
          placeholder="Клубын тайлбараа оруулна уу"
          required
        />
        </div>
       </div>
      </div>
      <div className='club-admin'>
      <div className='club-modal-inputs'>
        <label htmlFor="">Клубын админ</label>
          <Input
            name='Admin'
            variant='filled'
            size='large'
            placeholder='Админы нэр '
          />
      </div>
      <div className="training-file-box">
          <Upload
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
            beforeUpload={() => false}
            maxCount={1}
            fileList={clubFormEdit.Image ? [clubFormEdit.Image] : []}
          >
            <Button icon={<MdOutlineFileUpload />}>
              {isEditing ? 'Админы зураг солих' : 'Админы зураг хавсаргах'}
            </Button>
          </Upload>
        </div>
        <div className="club-modal-inputs">
          <label>Утасны дугаар</label>
            <Input
              name="Contact"
              variant="filled"
              onChange={handleClubForm}
              value={clubFormEdit.Contact}
              size="large"
              placeholder="Холбогдох утасны дугаараа оруулна уу"
              required
            />
        </div>
      </div>
        <label style={{fontWeight:'500' , fontSize:'15'}}>Клубын холбоо барих мэдээлэл</label>
        <div className='club-links'>
          <Input
            placeholder='Facebook'
            variant='filled'
            size='large'
          />
          <Input
            placeholder='Twitter'
            variant='filled'
            size='large'
          />
          <Input
            placeholder='Instagram'
            variant='filled'
            size='large'
          />
          <Input
            placeholder='Discord'
            variant='filled'
            size='large'
          />
        </div>
      <div className="add-footer">
        <Button
          disabled ={true}
          size="large"
          onClick={handleCancel}
          style={{ fontWeight: 700, marginLeft: 10 }}
        >
          Хаах
        </Button>
        
        <Button
          type="primary"
          style={{ fontWeight: 700, marginLeft: 10 }}
          size="large"
          onClick={handleSubmit}
        >
          {isEditing ? 'Өөрчлөлт хадгалах' : 'Нэмэх'}
        </Button>
      </div>
    </Modal>
  );
};

export default AddClubModal;
