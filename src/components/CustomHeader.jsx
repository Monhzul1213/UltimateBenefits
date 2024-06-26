import { bell, mainLogo } from "../assets";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuth } from "../context/AuthProvider/index";
import { Link } from "react-router-dom";

import "../css/customHeader.css";

export const CustomHeader = ({ title }) => {
  const { user, setOpenDrawer } = useAuth();
  return (
    <div className="custom-header">
      <div className="custom-header-title">
        <Link to="/">
          <img
            className="custom-header-logo"
            src={mainLogo}
            alt="Ultimate Benefits Logo"
          />
        </Link>
        <h1>{title}</h1>
      </div>
      <div
        onClick={() => setOpenDrawer(true)}
        className="custom-header-right-side"
      >
        <img className="custom-header-notf" src={bell} alt="" />
        <Avatar
          src={user.Picture}
          style={{ backgroundColor: "white", marginLeft: 20 }}
          size={40}
          icon={<UserOutlined />}
        />
        <div className="custom-header-user-section">
          <h1>{user.EmpFName}</h1>
          <p>{user.PositionName}</p>
        </div>
      </div>
    </div>
  );
};
