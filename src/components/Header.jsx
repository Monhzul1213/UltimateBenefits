import { bell, mainLogo } from "../assets";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuth } from "../context/AuthProvider/index";
import "../css/header.css";

export const Header = () => {
  const { user, setOpenDrawer } = useAuth();
  return (
    <header className="header">
      <img
        className="header-logo"
        src={mainLogo}
        alt="Ultimate Benefits Logo"
      />
      <div onClick={() => setOpenDrawer(true)} className="header-right-side">
        <img className="header-notf" src={bell} alt="" />
        <Avatar
          src={user?.Picture?.replace("./public/upload/", "/upload/")}
          style={{ backgroundColor: "white", marginLeft: 20 }}
          size={40}
          icon={<UserOutlined />}
        />
        <div className="header-user-section">
          <h1>{user.FirstName}</h1>
          <p>{user.Position}</p>
        </div>
      </div>
    </header>
  );
};
