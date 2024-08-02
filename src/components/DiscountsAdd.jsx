import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DiscountsAdd = ({ visible, onClose }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = (values) => {
    console.log("Received values of form: ", { ...values, imageUrl });
    onClose();
  };

  const handleImageChange = ({ file }) => {
    if (file.status === "done") {
      setImageUrl(URL.createObjectURL(file.originFileObj));
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      centered
      title={
        <div style={{ textAlign: "center", paddingBottom: "10px", borderBottom: "1px solid #f0f0f0" }}>
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
        <div className="dis-modal-flex">
        <div style={{ width: "100%"}}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Хөнгөлөлт, урамшууллын нэр</p>
          <Form.Item
            name="discountName"
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
              name="description"
              rules={[{ required: true, message: 'Тайлбараа оруулна уу' }]}
            >
              <Input
                size="large"
                placeholder="Тайлбараа оруулна уу"
              />
            </Form.Item>
          </div>
        </div>
        <div className="dis-modal-flex">
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Ажилласан жилийн шаардлага/сараар/ хэдэн удаа</p>
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
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom:5 }}>Дэлгэрэнгүй</p>
          <Form.Item
            name="details"
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
        <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid #f0f0f0", paddingTop: "10px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Button key="cancel" type="default" onClick={onClose} style={{ marginRight: "10px" }}>
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
