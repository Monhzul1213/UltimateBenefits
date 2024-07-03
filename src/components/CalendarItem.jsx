import { Tooltip } from "antd";
import React from "react";

export const CalendarItem = ({ item, isComing = false }) => {
  return (
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
  );
};
