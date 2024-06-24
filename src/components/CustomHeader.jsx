import { bell, mainLogo } from "../assets";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuth } from "../context/AuthProvider/index";
import { CiMenuFries } from "react-icons/ci";
import "../css/customHeader.css";

const CustomHeader = ({ title }) => {
  const { user } = useAuth();
  return (
    <div className="custom-header">
      <div className="custom-header-title">
        <a href="/">
          <img
            className="custom-header-logo"
            src={mainLogo}
            alt="Ultimate Benefits Logo"
          />
        </a>
        <h1>{title}</h1>
      </div>
      <CiMenuFries size={30} className="custom-phone-menu" />
      <div className="custom-header-right-side">
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

export default CustomHeader;
