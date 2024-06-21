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
          <h1>{user?.UserName}</h1>
          <div className="top-border" />
          <div className="user-information">
            <p>
              <Avatar size={15} />
              Программ хөгжүүлэгч
            </p>
            <p>
              <Avatar size={15} />
              95960202
            </p>
            <p>
              <Avatar size={15} />
              {user.Email}
            </p>
            <p>
              <Avatar size={15} />
              2024.06.18 аас хойш ажиллаж байгаа.
            </p>
            <p>
              <Avatar size={15} />
              БГД 17 хороо 44с-37 тоот
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
