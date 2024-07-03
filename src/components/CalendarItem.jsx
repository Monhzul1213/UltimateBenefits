import { Tooltip } from "antd";
import React from "react";

export const CalendarItem = ({ item }) => {
  return (
    <div className="calendar-item-card">
      <div className={`${item.Color}`} />
      <Tooltip title={`${item.BeginDate} ~ ${item.EndDate}`}>
        <h2>{item.BeginDate.slice(-2)}</h2>
      </Tooltip>

      <Tooltip title={item.Descr}>
        <p>{item.Descr}</p>
      </Tooltip>
    </div>
  );
};
