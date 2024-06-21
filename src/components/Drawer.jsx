import { useState } from "react";
import { Avatar, Button, Drawer } from "antd";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

import "../css/drawer.css";
import { useAuth } from "../context/AuthProvider";
import MyCalendar from "./MyCalendar";

const MyDrawer = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="drawer-handle" onClick={showDrawer}>
        <div className="drawer-arrow">
          <IoMdArrowDropleft size={40} color="#00c7f0" />
        </div>
      </div>
      <Drawer
        closeIcon={null}
        className="drawer-container"
        rootClassName="drawer-container"
        onClose={onClose}
        open={open}
      >
        <div className="drawer-content">
          <Avatar size={150} />
          <h1>
            {user?.EmpLName} {user?.EmpFName}
          </h1>
          <div className="top-border" />
          <div className="user-information">
            <p>
              <Avatar size={15} />
              {user.PositionName}
            </p>
            <p>
              <Avatar size={15} />
              {user?.Phone}
            </p>
            <p>
              <Avatar size={15} />
              {user?.WorkMail}
            </p>
            <p>
              <Avatar size={15} />
              {user?.BeginContractDate} аас хойш ажиллаж байгаа.
            </p>
            <p>
              <Avatar size={15} />
              {user.Address}
            </p>
            <Button
              onClick={() => {
                logout();
              }}
              className="logout"
            >
              Системээс гарах
            </Button>
          </div>
          <div className="top-border" />
        </div>
        <div className="drawer-arrow-in" onClick={onClose}>
          <IoMdArrowDropright size={40} color="#00c7f0" />
        </div>
        <div>
          <MyCalendar />
        </div>
      </Drawer>
    </>
  );
};
export default MyDrawer;
