import React, { useState } from "react";
import { useCalendar } from "../context/CalendarProvider";
import { Button, DatePicker } from "antd";
import { dateFormatWithYear } from "../lib/utils/dateFormatter";

const AddCalendarInput = ({}) => {
  const { addCalendar } = useCalendar();
  const [pickedDate, setPickedDate] = useState();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("green");
  const onCalendarChange = (date, dateString) => {
    setPickedDate(date);
  };
  const handleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleColor = (selected) => {
    setColor(selected);
  };
  const handleAdd = () => {
    if (pickedDate) {
      addCalendar(dateFormatWithYear(pickedDate?.$d), title, color);
      setTitle("");
      setColor("green");
      setPickedDate("");
    }
  };

  return (
    <div className="calendar-adding">
      <div className="calendar-input">
        <DatePicker
          onChange={onCalendarChange}
          placeholder="____-__-__"
          suffixIcon={false}
          allowClear={false}
          variant="borderless"
        />
        <input value={title} type="text" onChange={handleInput} />
      </div>
      <div className="calendar-dots">
        <div
          onClick={() => {
            handleColor("green");
          }}
          className={`green ${color === "green" && "selected-color"}`}
        ></div>
        <div
          onClick={() => {
            handleColor("red");
          }}
          className={`red ${color === "red" && "selected-color"}`}
        ></div>
        <div
          onClick={() => {
            handleColor("blue");
          }}
          className={`blue ${color === "blue" && "selected-color"}`}
        ></div>
      </div>

      <Button
        onClick={() => {
          handleAdd();
        }}
        className="add-calendar-btn"
        type="primary"
      >
        +
      </Button>
    </div>
  );
};

export default AddCalendarInput;
