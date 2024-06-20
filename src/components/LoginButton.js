import { Button } from "antd";
import React from "react";

const LoginButton = ({ handleClick, loading }) => {
  const style = {
    width: "100%",
    height: "60px",
    fontSize: "16px",
    backgroundColor: "#00c7f0",
    marginTop: "20px",
  };
  return (
    <Button
      onClick={!loading && handleClick}
      style={style}
      type="primary"
      loading={loading}
    >
      Нэвтрэх
    </Button>
  );
};

export default LoginButton;
