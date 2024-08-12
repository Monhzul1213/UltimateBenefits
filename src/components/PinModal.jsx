import { Modal } from "antd";
import { LoginButton, OTPInput } from "../components";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export const PinModal = ({ open, setOpen, register, handleForget }) => {
  const { handleLogin, loading } = useAuth();
  const [otp, setOtp] = useState(Array(4).fill(""));
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
      onCancel={() => {
        setOpen(false);
        setOtp(Array(4).fill(""));
      }}
      width={300}
    >
      <div>
        <OTPInput
          otp={otp}
          setOtp={setOtp}
          register={register}
          pin={pin}
          handleLogin={handleLogin}
          length={4}
          onChange={handlePin}
        />

        <LoginButton
          disabled={pin?.length === 4 ? false : true}
          pin={pin}
          loading={loading}
          handleClick={() => {
            handleLogin(register, pin);
          }}
        />
        <p
          onClick={() => {
            handleForget(true);
            setOpen(false);
          }}
          className="forget-button"
        >
          FORGOT PIN?
        </p>
      </div>
    </Modal>
  );
};
