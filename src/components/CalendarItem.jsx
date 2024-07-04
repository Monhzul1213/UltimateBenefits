import { Dropdown, Input, Tooltip } from "antd";
import React, { useState } from "react";
import AddCalendarInput from "./AddCalendarInput";
import EditCalendarSection from "./EditCalendarSection";

export const CalendarItem = ({ item, isComing = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const editDone = () => {
    setIsEditing(false);
  };
  const handleClick = ({ key }) => {
    if (key === "1") {
      setIsEditing(true);
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
            editDate={`${item?.Year}-${item?.Today}`}
            editColor={item?.Color}
          />
        </div>
      ) : (
        <Dropdown menu={{ items }} trigger={["contextMenu"]}>
          <div className="calendar-item-card">
            <div className={`${item?.Color}`} />
            {isComing ? (
              <>
                <h2>{item?.EndDate.slice(-2)}</h2>
              </>
            ) : (
              <figure>
                <h3>{item?.DateName}</h3>
                <h2>{item?.Today?.slice(-2)}</h2>
              </figure>
            )}

            <Tooltip title={item?.Descr}>
              <p>{item?.Descr}</p>
            </Tooltip>
          </div>
        </Dropdown>
      )}
    </>
  );
};
