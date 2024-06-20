import React from "react";
import { bell, mainLogo } from "../assets";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuth } from "../context/AuthProvider/index";
import "../css/header.css";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="header">
      <img
        className="header-logo"
        src={mainLogo}
        alt="Ultimate Benefits Logo"
      />
      <div className="header-right-side">
        <img className="header-notf" src={bell} alt="" />
        <Avatar
          style={{ backgroundColor: "white", marginLeft: 20 }}
          size={40}
          icon={<UserOutlined />}
        />
        <div className="header-user-section">
          <h1>{user.UserName}</h1>
          <p>Программ хөгжүүлэгч</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
