import { bell, mainLogo } from "../assets";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuth } from "../context/AuthProvider/index";
import { CiMenuFries } from "react-icons/ci";
import "../css/customHeader.css";

const CustomHeader = ({ title }) => {
  const { user } = useAuth();
  return (
    <header className="custom-header">
      <div className="custom-header-title">
        <img
          className="custom-header-logo"
          src={mainLogo}
          alt="Ultimate Benefits Logo"
        />
        <h1>{title}</h1>
      </div>

      <CiMenuFries size={30} className="phone-menu" color="white" />
      <div className="custom-header-right-side">
        <img className="custom-header-notf" src={bell} alt="" />
        <Avatar
          style={{ backgroundColor: "white", marginLeft: 20 }}
          size={40}
          icon={<UserOutlined />}
        />
        <div className="custom-header-user-section">
          <h1>{user.EmpFName}</h1>
          <p>Программ хөгжүүлэгч</p>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
