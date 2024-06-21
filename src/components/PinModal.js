import { Modal } from "antd";
import LoginButton from "./LoginButton";
import OTPInput from "./OtpInput";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
const PinModal = ({ open, setOpen, register }) => {
  const { handleLogin } = useAuth();
  const [pin, setPin] = useState("");
  const handlePin = (val) => {
    setPin(val);
  };
  return (
    <Modal
      title="Enter your PIN"
      centered
      open={open}
      footer={null}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={300}
    >
      <div>
        <OTPInput length={4} onChange={handlePin} />
        <LoginButton
          handleClick={() => {
            handleLogin(register, pin);
          }}
        />
      </div>
    </Modal>
  );
};
export default PinModal;
