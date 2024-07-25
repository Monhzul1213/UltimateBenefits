import React, { useState } from 'react';
import { AutoComplete, Input, DatePicker, Modal, Form, Button } from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const options = [
  {
    value: 'Төрсөн өдөр',
  },
  {
    value: 'Хурим',
  },
  {
    value: 'Шинэ аав',
  },
];

const DiscountsOption = ({ visible, onClose }) => {
  const [description, setDescription] = useState('');
  const [dates, setDates] = useState([null, null]);

  const handleOk = () => {
    if (onClose) onClose();
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: 'center', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          ЧӨЛӨӨ АВАХ ХҮСЭЛТИЙН ТӨРӨЛ
        </div>
      }
      visible={visible}
      onCancel={handleCancel}
      footer={null} // Remove default footer to customize
    >
      <Form layout="vertical">
        <Form.Item
          label="Чөлөө авах хүсэлтийн төрөл"
          style={{ marginBottom: '10px' }}
        >
          <AutoComplete
            style={{ width: '100%' }}
            options={options}
            placeholder="Чөлөө авах хүсэлтийн төрөл сонгох"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Form.Item>

        <Form.Item
          label="Тайлбар"
          style={{ marginBottom: '10px' }}
        >
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Тайлбар оруулах"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Огноо"
          style={{ marginBottom: '10px' }}
        >
          <RangePicker
            style={{ width: '100%' }}
            onChange={(dates, dateStrings) => setDates(dateStrings)}
            placeholder={['Эхлэх огноо', 'Дуусах огноо']}
          />
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
          <Button key="cancel" type="default" onClick={handleCancel} style={{ marginRight: '10px' }}>
            Болих
          </Button>
          <Button key="save" type="primary" onClick={handleOk}>
            Хадгалах
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DiscountsOption;
