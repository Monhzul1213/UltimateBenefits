import { Button, Col, Input, Modal, Row } from "antd";
import { useRef, useState } from "react";

const ChangePinModal = ({ open, setOpen, register }) => {
  const [pin, setPin] = useState("");
  const [otp, setOtp] = useState(Array(4).fill(""));
  const handlePin = (val) => {
    setPin(val);
  };
  const otpRef = useRef();
  const noRef = useRef();
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    if (/^[0-9]$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      handlePin(newOtp.join(""));
      if (index < 4 - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
      handlePin(newOtp.join(""));
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
    if (e.key === "Enter") {
    }
  };

  return (
    <Modal
      title="Enter your old PIN"
      centered
      open={open}
      footer={null}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={300}
    >
      <div>
        <Row gutter={8} justify="center">
          {otp.map((value, index) => (
            <Col key={index}>
              <Input
                ref={index === 0 ? otpRef : noRef}
                id={`otp-input-${index}`}
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{ width: 55, textAlign: "center", fontSize: 40 }}
              />
            </Col>
          ))}
        </Row>
        <Button
          style={{
            width: "100%",
            height: "60px",
            fontSize: "16px",
            backgroundColor: "#00c7f0",
            marginTop: "20px",
          }}
          type="primary"
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </Modal>
  );
};
export default ChangePinModal;
