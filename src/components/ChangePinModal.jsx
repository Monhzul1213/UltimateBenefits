import { Button, Col, Input, Modal, Row } from "antd";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";

const ChangePinModal = ({ open, setOpen }) => {
  const { checkOldPassword, changePassword } = useAuth();
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
  //check password
  const [isSuccess, setIsSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const handleSuccess = async () => {
    const boolean = await checkOldPassword(pin);
    setOldPassword(pin);
    setIsSuccess(boolean);
    setPin("");
    setOtp(Array(4).fill(""));
  };

  return (
    <Modal
      title={isSuccess ? "Enter your new PIN" : "Enter your old PIN"}
      centered
      open={open}
      footer={null}
      onOk={() => setOpen(false)}
      onCancel={() => {
        setOpen(false);
        setIsSuccess(false);
      }}
      width={300}
      onClose={() => {
        setIsSuccess(false);
      }}
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
        {isSuccess ? (
          <Button
            disabled={pin.length === 4 ? false : true}
            onClick={() => {
              changePassword(pin, oldPassword);
              setOpen(false);
              setPin("");
              setOtp(Array(4).fill(""));
              setIsSuccess(false);
            }}
            style={{
              width: "100%",
              height: "60px",
              fontSize: "16px",
              backgroundColor: "#00c7f0",
              marginTop: "20px",
            }}
            type="primary"
          >
            Хадгалах
          </Button>
        ) : (
          <Button
            onClick={() => handleSuccess()}
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
        )}
      </div>
    </Modal>
  );
};
export default ChangePinModal;
