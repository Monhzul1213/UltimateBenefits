import { Input, Modal } from "antd";
import { LoginButton, OTPInput } from "../components";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export const ForgetModal = ({ open, setOpen }) => {
  const { loading, resetPassword } = useAuth();
  const [inputValue, setInputValue] = useState();
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <Modal
      title="Регистерийн дугаар"
      centered
      open={open}
      footer={null}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={300}
    >
      <div>
        <Input size="large" onChange={handleInput} />
        <LoginButton
          isForgot={true}
          loading={loading}
          handleClick={() => {
            setOpen(false);
            resetPassword(inputValue);
          }}
        />
      </div>
    </Modal>
  );
};
