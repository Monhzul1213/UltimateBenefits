import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DiscountsCard = ({ visible, onClose, data }) => {
  const [description, setDescription] = useState(data?.description || "");
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = (discounts) => {
    console.log("Card ",discounts);
    onClose();
    };

  const handleImageChange = ({ file }) => {
    if (file.status === "done") {
       setImageUrl(URL.createObjectURL(file.originFileObj));
    }
  };

  useEffect(() => {
    if (data) {
      setDescription(data.description || "");
    }
  }, [data]);

  const handleInput = (e) => {
    setDescription(e.target.value);
  };

  if (!data) return null;

  return (
    <Modal
      title={
        <div
          style={{
            textAlign: "center",
            paddingBottom: "10px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {data.title || ""}
        </div>
      }
      open={visible}
      onCancel={onClose}
      onFinish={onFinish}
      footer={null}
      centered
    >
      <Form layout="vertical">
      <div className="dis-modal-flex">
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Хөнгөлөлт, урамшууллын нэр</p>
          <Form.Item
            rules={[{ required: true, message: 'Хөнгөлөлт, урамшууллын нэрээ оруулна уу' }]}
          >
            <Input
              size="large"
              style={{backgroundColor: "#F5F5F5"}}
              placeholder="Хөнгөлөлт, урамшууллын нэрээ оруулна уу"
            />
          </Form.Item>
        </div>
        </div>
      <div className="dis-modal-flex">
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Тайлбар</p>
          <Form.Item
            rules={[{ required: true, message: 'Тайлбараа оруулна уу' }]}
          >
            <Input
              size="large"
              onChange={handleInput}
              placeholder="Тайлбараа оруулна уу"
            />
          </Form.Item>
        </div>
      </div>
      <div className="dis-modal-flex">
         <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Ажилласан жилийн шаардлага/сараар/</p>
          <Form.Item
            rules={[{ required: true, message: '' }]}
          >
            <Input
              size="large"
              onChange={handleInput}
              placeholder="Ажилласан сар"
            />
          </Form.Item>
        </div>
        </div>
        <div className="dis-modal-flex">
         <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}> Хэдэн удаа</p>
          <Form.Item
            rules={[{ required: true, message: 'Хэдэн удаа /тоогоо оруулна уу/' }]}
          >
            <Input
              size="large"
              onChange={handleInput}
              placeholder="Хэдэн удаа / тоогоо оруулна уу/"
            />
          </Form.Item>
        </div>
        </div>
        <div className="dis-modal-flex">
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Дэлгэрэнгүй</p>
          <Form.Item
            rules={[{ required: true, message: 'Дэлгэрэнгүй мэдээллийг оруулна уу' }]}
          >
            <Input.TextArea
              size="large"
              placeholder="Дэлгэрэнгүй мэдээллийг оруулна уу"
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

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "10px",
          }}
        >
          
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              key="cancel"
              type="default"
              onClick={onClose}
              style={{ marginRight: "10px" }}
            >
              Болих
            </Button>
            <Button key="save" type="primary" onClick={onClose}>
              Хадгалах
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default DiscountsCard;
