import { bell, mainLogo } from "../assets";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuth } from "../context/AuthProvider/index";
import { CiMenuFries } from "react-icons/ci";
import "../css/customHeader.css";

const CustomHeader = ({ title }) => {
  const { user } = useAuth();
  return (
    <header className="header">
      <div className="header-title">
        <img
          className="header-logo"
          src={mainLogo}
          alt="Ultimate Benefits Logo"
        />
        <h1>{title}</h1>
      </div>

      <CiMenuFries size={30} className="phone-menu" color="white" />
      <div className="header-right-side">
        <img className="header-notf" src={bell} alt="" />
        <Avatar
          style={{ backgroundColor: "white", marginLeft: 20 }}
          size={40}
          icon={<UserOutlined />}
        />
        <div className="header-user-section">
          <h1>{user.EmpFName}</h1>
          <p>Программ хөгжүүлэгч</p>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
