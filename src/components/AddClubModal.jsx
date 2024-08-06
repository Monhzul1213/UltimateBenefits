import React, { useState } from 'react';
import { useClub } from '../context/ClubsProvider';
import { Modal, Input, Button, Upload, Form } from 'antd';
import { MdOutlineFileUpload } from 'react-icons/md';
import TextArea from 'antd/es/input/TextArea';

export const AddClubModal = ({ isOpen, onClose }) => {
  const { addClub } = useClub();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key !== 'Image') {
        formData.append(key, values[key]);
      }
    });
    if (fileList.length > 0) {
      formData.append('Image', fileList[0].originFileObj);
    }
    await addClub(formData);
    onClose();
    form.resetFields();
    setFileList([]);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Modal
      title="ШИНЭ КЛУБ НЭМЭХ"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="Name"
          label="Клубын нэр"
          rules={[{ required: true, message: 'Клубын нэрээ оруулна уу' }]}
        >
          <Input placeholder='Клубын нэрээ оруулна уу' />
        </Form.Item>

        <Form.Item
          name="Descr"
          label="Тайлбар"
          rules={[{ required: true, message: 'Тайлбар оруулна уу' }]}
        >
          <TextArea placeholder='Тайлбар оруулна уу' />
        </Form.Item>

        <Form.Item
          name="Contact"
          label="Утасны дугаар"
          rules={[{ required: true, message: 'Утасны дугаараа оруулна уу' }]}
        >
          <Input placeholder='Утасны дугаараа оруулна уу' />
        </Form.Item>

        <Form.Item
          name="Image"
          label="Зураг"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
            beforeUpload={() => false}
            maxCount={1}
            fileList={fileList}
          >
            <Button icon={<MdOutlineFileUpload />}>Зураг хавсаргах</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button onClick={handleCancel}>Болих</Button>
          <Button type="primary" htmlType="submit" style={{ margin: 8 }}>
            Нэмэх
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClubModal;
