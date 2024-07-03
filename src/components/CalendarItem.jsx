import React from "react";

export const CalendarItem = ({ item }) => {
  return (
    <div className="calendar-item-card">
      <div className={`${item.Color}`} />
      <h2>{item.BeginDate.slice(-2)}</h2>
      <p>{item.Descr}</p>
    </div>
  );
};
