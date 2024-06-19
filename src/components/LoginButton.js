import React from "react";

const LoginButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className="login-button">
      Нэвтрэх
    </button>
  );
};

export default LoginButton;
