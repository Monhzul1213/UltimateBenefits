import { Button, DatePicker } from "antd";
import React from "react";

export const AddCalendar = () => {
  const onCalendarChange = (date, dateString) => {
    console.log("data string", dateString);
  };
  return (
    <section className="calendar-section-container">
      <h1>Тэмдэглэл нэмэх</h1>
      <div className="calendar-adding-container">
        <div className="calendar-adding">
          <div className="calendar-input">
            <DatePicker
              onChange={onCalendarChange}
              placeholder="____-__-__"
              suffixIcon={false}
              allowClear={false}
              variant="borderless"
            />
            <input type="text" />
          </div>
          <div className="calendar-dots">
            <div className="green"></div>
            <div className="red"></div>
            <div className="blue"></div>
          </div>
          <Button className="add-calendar-btn" type="primary">
            +
          </Button>
        </div>
        <div className="calendar-adding">
          <div className="calendar-input">
            <DatePicker
              placeholder="____-__-__"
              suffixIcon={false}
              allowClear={false}
              variant="borderless"
            />
            <input type="text" />
          </div>
          <div className="calendar-dots">
            <div className="green"></div>
            <div className="red"></div>
            <div className="blue"></div>
          </div>
          <Button className="add-calendar-btn" type="primary">
            +
          </Button>
        </div>

        <div className="calendar-adding">
          <div className="calendar-input">
            <DatePicker
              placeholder="____-__-__"
              suffixIcon={false}
              allowClear={false}
              variant="borderless"
            />
            <input type="text" />
          </div>
          <div className="calendar-dots">
            <div className="green"></div>
            <div className="red"></div>
            <div className="blue"></div>
          </div>
          <Button className="add-calendar-btn" type="primary">
            +
          </Button>
        </div>
      </div>
    </section>
  );
};
