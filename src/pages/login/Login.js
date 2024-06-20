import { useState } from "react";

import { RegisterSelect } from "../../components/RegisterSelect";
import "../../css/login.css";
import { loginlogo, logo } from "../../assets";
import PinModal from "../../components/PinModal";
import LoginButton from "../../components/LoginButton";
import { useAuth } from "../../context/AuthProvider";

export function Login() {
  let [registerLetters] = useState([]);
  const [registerNums, setRegisterNums] = useState("");
  const handleInput = (e) => {
    setRegisterNums(e.target.value);
  };
  const handleSelecet = (value, index) => {
    registerLetters[index] = value;
  };
  const { handleCheckRegister, loading, open, setOpen } = useAuth();
  return (
    <main className="login-page">
      <section className="left-section">
        <PinModal
          open={open}
          setOpen={setOpen}
          register={registerLetters.join("") + registerNums}
        />
        <img className="login-logo" src={loginlogo} alt="" />
        <div className="input-section">
          <h1 className="login-header">Welcome back ULTIMATE family!</h1>
          <div className="register">
            <p className="subtext">Регистрийн дугаар</p>
            <div className="input-div">
              <RegisterSelect index={0} onChange={handleSelecet} />
              <RegisterSelect index={1} onChange={handleSelecet} />
              <input
                onChange={handleInput}
                placeholder="12345678"
                className="register-input"
                type="tel"
                maxLength={8}
              />
            </div>
            <LoginButton
              handleClick={() => {
                handleCheckRegister(registerLetters, registerNums);
              }}
              loading={loading}
            />
          </div>
        </div>
      </section>
      <section className="right-section">
        <img className="login-photo" src={logo} alt="" />
      </section>
    </main>
  );
}
