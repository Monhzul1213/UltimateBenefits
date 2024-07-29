import React, { useState } from 'react';
import { Input, DatePicker, Modal, Form, Button, Popover, Upload } from 'antd';
import moment from 'moment';
import { UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const DiscountsOption = ({ visible, onClose }) => {
  const [description, setDescription] = useState('');
  const [dates, setDates] = useState([null, null]);
  const [selectedType, setSelectedType] = useState('');
  const [newType, setNewType] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleOk = () => {
    // Handle form submission
    console.log('Selected Type:', selectedType);
    console.log('Description:', description);
    console.log('Dates:', dates);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    setDescription('');
    setDates([null, null]);
    setSelectedType('');
    setNewType('');
    if (onClose) onClose();
  };

  const handleTypeInput = (e) => {
    setNewType(e.target.value);
  };

  const addTrainingType = () => {
    if (newType.trim() !== '') {
      setSelectedType(newType);
      setNewType('');
    }
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", { ...values, imageUrl });
    onClose();
  };

  const handleImageChange = ({ file }) => {
    if (file.status === "done") {
      setImageUrl(URL.createObjectURL(file.originFileObj));
    }
  };

  const content = (
    <div>
      <Input
        value={newType}
        onChange={handleTypeInput}
        placeholder="Шинэ төрөл нэмэх"
        style={{ marginBottom: '8px' }}
      />
      <Button type="primary" onClick={addTrainingType}>
        Төрөл нэмэх
      </Button>
    </div>
  );

  return (
    <Modal
      title={
        <div style={{ textAlign: 'center', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          ЧӨЛӨӨ АВАХ ХҮСЭЛТИЙН ТӨРӨЛ
        </div>
      }
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form
        id="discounts-form"
        name="discounts-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <div className="dis-modal-flex">
          <div style={{ width: "100%" }}>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Тайлбар</p>
            <Form.Item
              name="description"
              rules={[{ required: true, message: 'Тайлбараа оруулна уу' }]}
            >
              <Input
                size="large"
                style={{backgroundColor: "#F5F5F5"}}
                placeholder="Тайлбараа оруулна уу"
              />
            </Form.Item>
          </div>
        </div>
      <div className="dis-modal-flex">
         <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500,marginBottom:5 }}>Ажилласан жилийн шаардлага/сараар/ хэдэн удаа</p>
          <Form.Item
            name="requirements"
            rules={[{ required: true, message: 'Шаардлагыг оруулна уу' }]}
          >
            <Input.TextArea
              size="large"
              placeholder="Ажилласан жилийн шаардлага оруулна уу"
            />
          </Form.Item>
        </div>
        </div>

      <div className="dis-modal-flex">
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Дэлгэрэнгүй мэдээлэл</p>
          <Form.Item
            name="details"
            rules={[{ required: true, message: 'Дэлгэрэнгүй мэдээллийг оруулна уу' }]}
          >
            <TextArea
              size="large"
              placeholder="Дэлгэрэнгүй мэдээллийг оруулна уу"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </div>
        </div>

        <div className="dis-modal-flex">
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Огноог сонгох</p>
          <Form.Item
            name="dateRange"
            rules={[{ required: true, message: 'Огноог сонгоно уу' }]}
          >
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates, dateStrings) => setDates(dateStrings)}
              value={dates.length === 2 ? [moment(dates[0]), moment(dates[1])] : []}
              placeholder={['Эхлэх огноо', 'Дуусах огноо']}
            />
          </Form.Item>
        </div>
        </div>
        <div className="training-file-box" style={{ width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}></p>
          <Upload
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Зураг хавсаргах</Button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginTop: 10, maxWidth: "100%" }} />}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
          <Button type="default" onClick={handleCancel} style={{ marginRight: '10px' }}>
            Болих
          </Button>
          <Button type="primary" onClick={handleOk}>
            Илгээх
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DiscountsOption;
