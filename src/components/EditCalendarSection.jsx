import React, { useState } from "react";
import { useCalendar } from "../context/CalendarProvider";
import { Button, DatePicker } from "antd";
import { dateFormatWithYear } from "../lib/utils/dateFormatter";
import moment from "moment";

const EditCalendarSection = ({
  editTitle,
  editColor,
  editDate,
  editDone,
  editId,
}) => {
  const { editCalendar } = useCalendar();
  const [pickedDate, setPickedDate] = useState(moment(editDate));
  const [title, setTitle] = useState(editTitle);
  const [color, setColor] = useState(editColor);
  const onCalendarChange = (date, dateString) => {
    setPickedDate(date);
  };
  const handleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleColor = (selected) => {
    setColor(selected);
  };
  const handleEdit = () => {
    if (pickedDate) {
      editCalendar(dateFormatWithYear(editId, pickedDate?.$d), title, color);
      editDone();
    }
  };
  console.log("moment", pickedDate);
  return (
    <div className="calendar-adding">
      <div className="calendar-input">
        <DatePicker
          defaultValue={pickedDate}
          onChange={onCalendarChange}
          placeholder={editDate}
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
          handleEdit();
        }}
        className="add-calendar-btn"
        type="primary"
      >
        +
      </Button>
    </div>
  );
};

export default EditCalendarSection;
