import React from "react";

import { RegisterSelect } from "../../components/RegisterSelect";
import "../../css/login.css";
import { loginlogo, logo } from "../../assets";

export function Login() {
  return (
    <main className="login-page">
      <section className="left-section">
        <img className="login-logo" src={loginlogo} alt="" />
        <div className="input-section">
          <h1 className="login-header">Welcome back ULTIMATE family!</h1>
          <div className="register">
            <p className="subtext">Регистрийн дугаар</p>
            <div className="input-div">
              <RegisterSelect />
              <RegisterSelect />
              <input
                placeholder="12345678"
                className="register-input"
                type="number"
                maxLength={8}
              />
            </div>
            <button className="login-button">Нэвтрэх</button>
          </div>
        </div>
      </section>
      <section className="right-section">
        <img className="login-photo" src={logo} alt="" />
      </section>
    </main>
  );
}
