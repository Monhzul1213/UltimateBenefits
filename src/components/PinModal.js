import { Modal } from "antd";
import LoginButton from "./LoginButton";
import OTPInput from "./OtpInput";
import { useState } from "react";
import { login } from "../lib/actions/user.actions";
const PinModal = ({ open, setOpen }) => {
  const [pin, setPin] = useState("");
  const handlePin = (val) => {
    setPin(val);
  };
  const handleLoginBtn = async () => {
    if (pin.length === 4) {
      await login();
      setOpen(false);
    } else {
      alert("Invalid Pin");
    }
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
        <LoginButton handleClick={handleLoginBtn} />
      </div>
    </Modal>
  );
};
export default PinModal;
