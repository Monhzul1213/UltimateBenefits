import React from "react";
import AddCalendarInput from "./AddCalendarInput";

export const AddCalendar = () => {
  return (
    <section className="calendar-section-container">
      <h1>Тэмдэглэл нэмэх</h1>
      <div className="calendar-adding-container">
        <AddCalendarInput />
        {/* <AddCalendarInput />
        <AddCalendarInput /> */}
      </div>
    </section>
  );
};
