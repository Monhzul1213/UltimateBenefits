import React, { useState } from 'react';
import { Button, Modal, Radio } from 'antd';

const DiscountsCard = ({ visible, onClose, data }) => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  if (!data) return null;

  return (
    <Modal
      title={data.title || ''}
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Хаах
        </Button>
      ]}
    >
      {/* Display Description */}
      <p>{data.description || 'No description available'}</p>

      {/* Radio Group */}
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={0}>Идэвхгүй</Radio>
        <Radio value={1}>Идэвхтэй</Radio>
      </Radio.Group>

      {/* Additional content could go here */}
    </Modal>
  );
};

export default DiscountsCard;
