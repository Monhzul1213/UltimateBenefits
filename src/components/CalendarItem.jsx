import React from "react";

export const CalendarItem = ({ item }) => {
  return (
    <div className="calendar-item-card">
      <div className={`${item.color}`} />
      <h2>{item.date.slice(-2)}</h2>
      <p>{item.title}</p>
    </div>
  );
};
