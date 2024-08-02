import { Modal } from "antd";
import { LoginButton, OTPInput } from "../components";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export const PinModal = ({ open, setOpen, register }) => {
  const { handleLogin, loading } = useAuth();
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
        <OTPInput
          register={register}
          pin={pin}
          handleLogin={handleLogin}
          length={4}
          onChange={handlePin}
        />
        <LoginButton
          disabled={pin.length === 4 ? false : true}
          loading={loading}
          handleClick={() => {
            handleLogin(register, pin);
          }}
        />
      </div>
    </Modal>
  );
};
