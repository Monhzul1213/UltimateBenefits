import React, { useState } from 'react';
import { Form, Input, Button, Switch, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const DiscountsAdd = ({ visible, onClose }) => {
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = (values) => {
    console.log('Received values of form: ', { ...values, status: isActive, imageUrl });
    onClose();
  };

  const handleStatusChange = (checked) => {
    setIsActive(checked);
  };

  const handleImageChange = ({ file }) => {
    if (file.status === 'done') {
      setImageUrl(URL.createObjectURL(file.originFileObj));
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      centered
      title={
        <div style={{ textAlign: 'center', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          ХӨНГӨЛӨЛТ УРАМШУУЛАЛ НЭМЭХ
        </div>
      }
      footer={null}
    >
      <Form
        id="discounts-form"
        name="discounts-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="discountName"
          label="Хөнгөлөлт, урамшууллын нэр"
          rules={[{message: 'Хөнгөлөлт, урамшууллын нэрээ оруулна уу' }]}
        >
          <Input placeholder="Хөнгөлөлт, урамшууллын нэрээ оруулна уу" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Тайлбар"
          rules={[{message: 'Тайлбараа оруулна уу' }]}
        >
          <Input placeholder="Тайлбараа оруулна уу" />
        </Form.Item>

        <Form.Item
          name="details"
          label="Дэлгэрэнгүй"
          rules={[{ message: 'Дэлгэрэнгүй мэдээллийг оруулна уу' }]}
        >
          <Input.TextArea placeholder="Дэлгэрэнгүй мэдээллийг оруулна уу" />
        </Form.Item>

        <Form.Item label="Зураг">
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false} 
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Зураг сонгох</Button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
        </Form.Item>

        <Form.Item label="Төлөв">
          <label>
            <Switch checked={isActive} onChange={handleStatusChange} /> {isActive ? 'Идэвхтэй' : 'Идэвхгүй'}
          </label>
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button key="cancel" type="default" onClick={onClose} style={{ marginRight: '10px' }}>
              Болих
            </Button>
            <Button key="save" type="primary" htmlType="submit" form="discounts-form">
              Хадгалах
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default DiscountsAdd;
