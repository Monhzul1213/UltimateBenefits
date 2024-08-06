import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { loginlogo, logo } from "../../assets";
import {
  PinModal,
  LoginButton,
  RegisterSelect,
  ForgetModal,
} from "../../components";
import "../../css/login.css";

export function Login() {
  const inputRef = useRef();
  const focusInput = () => {
    inputRef.current.focus({
      cursor: "start",
    });
  };
  const [openAb, setOpenAb] = useState();
  let [registerLetters] = useState([]);
  const [registerNums, setRegisterNums] = useState("");
  const handleInput = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setRegisterNums(newValue);
  };
  const handleSelecet = (value, index) => {
    registerLetters[index] = value;
  };
  const handleSelectKeyDown = (e) => {
    console.log(e);
  };
  const { handleCheckRegister, loading, open, setOpen } = useAuth();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCheckRegister(registerLetters, registerNums);
    }
  };
  //FORGET PASSWORD
  const [forgetModal, setForgetModal] = useState(false);
  const handleForget = (value) => {
    setForgetModal(value);
  };
  return (
    <main className="login-page">
      <section className="left-section">
        <PinModal
          open={open}
          setOpen={setOpen}
          register={registerLetters?.join("") + registerNums}
          handleForget={handleForget}
        />
        <ForgetModal open={forgetModal} setOpen={handleForget} />
        <img className="login-logo" src={loginlogo} alt="" />
        <div className="input-section">
          <h1 className="login-header">Welcome back ULTIMATE family!</h1>
          <div className="register">
            <p className="subtext">Регистрийн дугаар</p>
            <div className="input-div">
              <RegisterSelect
                focusInput={focusInput}
                registerLetters={registerLetters}
                open={openAb}
                setOpen={setOpenAb}
                index={0}
                onChange={handleSelecet}
                handleSelectKeyDown={handleSelectKeyDown}
              />
              <RegisterSelect
                focusInput={focusInput}
                registerLetters={registerLetters}
                open={openAb}
                setOpen={setOpenAb}
                index={1}
                onChange={handleSelecet}
                handleSelectKeyDown={handleSelectKeyDown}
              />
              <input
                ref={inputRef}
                value={registerNums}
                onChange={handleInput}
                placeholder="12345678"
                className="register-input"
                type="text"
                maxLength={8}
                onKeyDown={handleKeyDown}
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
