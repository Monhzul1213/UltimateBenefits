import { Button } from "antd";
import React from "react";

const LoginButton = ({ handleClick, isLoading }) => {
  const style = {
    width: "100%",
    height: "60px",
    fontSize: "16px",
    backgroundColor: "#00c7f0",
    marginTop: "20px",
  };
  return (
    <Button
      onClick={handleClick}
      style={style}
      type="primary"
      loading={isLoading}
    >
      Нэвтрэх
    </Button>
    // <button onClick={handleClick} className="login-button">
    //   Нэвтрэх
    // </button>
  );
};

export default LoginButton;
