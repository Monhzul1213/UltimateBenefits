import React, { useState, useEffect } from 'react';
import { Button, Modal, Switch, Form, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const DiscountsCard = ({ visible, onClose, data }) => {
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(data?.description || '');

  useEffect(() => {
    if (data) {
      setIsActive(data.status === 1);
      setDescription(data.description || '');
    }
  }, [data]);

  const handleStatusChange = (checked) => {
    setIsActive(checked);
    console.log(`Status changed to: ${checked ? 'Active' : 'Inactive'}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved:', { description, isActive });
    onClose();
  };

  if (!data) return null;

  return (
    <Modal
      title={
        <div style={{ textAlign: 'center', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          {data.title || ''}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form layout="vertical">
        <Form.Item label="Тайлбар" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isEditing ? (
              <Input.TextArea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ flex: 1 }}
              />
            ) : (
              <p style={{ flex: 1 }}>{description || 'No description available'}</p>
            )}
            <EditOutlined
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={handleEdit}
            />
          </div>
        </Form.Item>

        <Form.Item label="Төлөв">
          <label>
            <Switch checked={isActive} onChange={handleStatusChange} disabled={!isEditing} />{' '}
            {isActive ? 'Идэвхтэй' : 'Идэвхгүй'}
          </label>
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button key="cancel" type="default" onClick={onClose} style={{ marginRight: '10px' }}>
            Болих
          </Button>
          <Button key="save" type="primary" onClick={handleSave} disabled={!isEditing}>
            Хадгалах
          </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default DiscountsCard;
