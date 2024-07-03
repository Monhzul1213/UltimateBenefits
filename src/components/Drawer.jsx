import { Avatar, Button, Drawer, Dropdown } from "antd";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { dateFormatter } from "../lib/utils/dateFormatter";

import { useAuth } from "../context/AuthProvider";
import { MyCalendar, AddCalendar, CalendarItem } from "../components";

import { userCalendarItems } from "../constants";
import "../css/drawer.css";
import { useCalendar } from "../context/CalendarProvider";

export const MyDrawer = () => {
  const { user, logout, openDrawer, setOpenDrawer } = useAuth();
  const { dayItems } = useCalendar();
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
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
        open={openDrawer}
      >
        <div className="drawer-content">
          <Avatar src={user?.Picture} size={150} />
          <h1>
            {user?.EmpLName} {user?.EmpFName}
          </h1>
          <div className="top-border" />
          <div className="user-information">
            <p>
              <Avatar size={15} />
              {user?.PositionName}
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
              {user?.Address}
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
        <div className="calendar-section">
          <Dropdown
            dropdownRender={AddCalendar}
            trigger={["click"]}
            placement="bottomLeft"
          >
            <Button
              className="add-calendar-btn add-calendar-btn-absolute"
              type="primary"
            >
              +
            </Button>
          </Dropdown>
          <MyCalendar />
          <div className="calendar-items-container">
            <div className="calendar-item-cards-container">
              <p>Today</p>
              {dayItems?.result.map((itm) => {
                console.log("ITEM", itm);
                return <CalendarItem item={itm} />;
              })}
            </div>
            <div className="calendar-item-cards-container">
              <p>Coming</p>
              {dayItems?.allDay.map((itm) => (
                <CalendarItem item={itm} />
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
