import { Input, Modal } from "antd";
import { LoginButton, OTPInput } from "../components";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export const ForgetModal = ({ open, setOpen, loginOpen }) => {
  const { loading, resetPassword } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleClick = async () => {
    await resetPassword(inputValue);
    setInputValue("");
    setOpen(false);
  };
  return (
    <Modal
      title="Регистерийн дугаар"
      centered
      open={open}
      footer={null}
      onOk={() => setOpen(false)}
      onCancel={() => {
        setOpen(false);
        setInputValue("");
      }}
      width={300}
    >
      <div>
        <Input
          style={{ fontSize: "30px" }}
          value={inputValue}
          size="large"
          onChange={handleInput}
        />
        <LoginButton
          isForgot={true}
          loading={loading}
          handleClick={() => {
            handleClick();
          }}
        />
        <p
          onClick={() => {
            setOpen(false);
            loginOpen(true);
            setInputValue("");
          }}
          className="forget-button"
        >
          LOGIN
        </p>
      </div>
    </Modal>
  );
};
