import { Avatar, Button, Drawer, Dropdown, Popover, Spin } from "antd";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { IoReload } from "react-icons/io5";

import { useAuth } from "../context/AuthProvider";
import { MyCalendar, AddCalendar, CalendarItem } from "../components";

import "../css/drawer.css";
import { useCalendar } from "../context/CalendarProvider";
import { checkRole } from "../lib/utils/checkRole";

export const MyDrawer = () => {
  const { user, logout, openDrawer, setOpenDrawer } = useAuth();
  const { dayItems, calendarLoading, calenderFailed, retryCalendarData } =
    useCalendar();

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
            {user?.LastName} {user?.FirstName}
          </h1>
          <div className="top-border" />
          <div className="user-information">
            <p>
              <Avatar size={15} />
              {user?.Position}
            </p>
            <p>
              <Avatar size={15} />
              {user?.PhoneNumber}
            </p>
            <p>
              <Avatar size={15} />
              {user?.Email}
            </p>
            <p>
              <Avatar size={15} />
              {user?.HireDate} аас хойш ажиллаж байгаа.
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
          {checkRole(user?.Role) ? (
            <Popover
              arrow={false}
              overlayInnerStyle={{ padding: 0, boxShadow: "none" }}
              content={AddCalendar}
              trigger={"click"}
              placement="bottomLeft"
            >
              <Button
                className="add-calendar-btn add-calendar-btn-absolute"
                type="primary"
              >
                +
              </Button>
            </Popover>
          ) : (
            <span></span>
          )}
          <MyCalendar />
          <div className="calendar-items-container">
            {calendarLoading ? (
              <div className="calendar-loading">
                <Spin />
              </div>
            ) : calenderFailed ? (
              <div className="calendar-loading">
                <p>Календарны тэмдэглэл уншихад алдаа гарлаа</p>
                <Button onClick={retryCalendarData} icon={<IoReload />}>
                  Дахин оролдох
                </Button>
              </div>
            ) : (
              <>
                <div className="calendar-item-cards-container">
                  <p>Today</p>
                  {dayItems?.result.map((itm, idx) => {
                    return <CalendarItem key={idx} item={itm} />;
                  })}
                </div>
                <div className="calendar-item-cards-container">
                  <p>Coming</p>
                  {dayItems?.allDay.map((itm, idx) => (
                    <CalendarItem key={idx} isComing={true} item={itm} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
