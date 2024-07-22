import { Dropdown, Tooltip } from "antd";
import { useState } from "react";
import EditCalendarSection from "./EditCalendarSection";
import { alert } from "../lib/actions/alert.actions";
import { useCalendar } from "../context/CalendarProvider";
import { useAuth } from "../context/AuthProvider";
import { checkRole } from "../lib/utils/checkRole";

export const CalendarItem = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteCalendar } = useCalendar();
  const { user } = useAuth();
  const editDone = () => {
    setIsEditing(false);
  };
  const handleClick = ({ key }) => {
    if (item.CalendarID === "0") {
      alert("Уучлаарай, өөрчлөх боломжгүй тэмдэглэл!", "warning");
      return;
    }
    if (key === "1") {
      setIsEditing(true);
    }
    if (key === "2") {
      deleteCalendar(item.CalendarID);
    }
  };
  const items = [
    {
      label: "Засах",
      key: "1",
      onClick: handleClick,
    },
    {
      label: "Устгах",
      key: "2",
      danger: true,
      onClick: handleClick,
    },
  ];

  return (
    <>
      {isEditing ? (
        <div style={{ marginLeft: "-10px" }}>
          <EditCalendarSection
            editId={item.CalendarID}
            editDone={editDone}
            isEditing={true}
            editTitle={item?.Descr}
            editDate={`${item?.Year}-${item?.RestDate}`}
            editColor={item?.Color}
          />
        </div>
      ) : checkRole(user?.Role) ? (
        <Dropdown menu={{ items }} trigger={["contextMenu"]}>
          <div className="calendar-item-card">
            <div className={`${item?.Color}`} />
            <figure>
              <h3>{item?.DateName}</h3>
              <h2>{item?.RestDate?.slice(-2)}</h2>
            </figure>
            <Tooltip title={item?.Descr}>
              <p>{item?.Descr}</p>
            </Tooltip>
          </div>
        </Dropdown>
      ) : (
        <div className="calendar-item-card">
          <div className={`${item?.Color}`} />
          <figure>
            <h3>{item?.DateName}</h3>
            <h2>{item?.RestDate?.slice(-2)}</h2>
          </figure>
          <Tooltip title={item?.Descr}>
            <p>{item?.Descr}</p>
          </Tooltip>
        </div>
      )}
    </>
  );
};
