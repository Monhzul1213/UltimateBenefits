import React, { useState } from "react";
import { useCalendar } from "../context/CalendarProvider";
import { Button, DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { dateFormatWithYear } from "../lib/utils/dateFormatter";

const EditCalendarSection = ({
  editTitle,
  editColor,
  editDate,
  editDone,
  editId,
}) => {
  const { editCalendar } = useCalendar();
  const [pickedDate, setPickedDate] = useState(editDate);
  const [title, setTitle] = useState(editTitle);
  const [color, setColor] = useState(editColor);
  const onCalendarChange = (date, dateString) => {
    setPickedDate(dateString);
  };
  const handleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleColor = (selected) => {
    setColor(selected);
  };
  const handleEdit = () => {
    editCalendar(editId, pickedDate, title, color);
    editDone();
  };
  return (
    <div className="calendar-edit-container ">
      <DatePicker
        allowClear={false}
        style={{ width: "100%" }}
        value={dayjs(pickedDate)}
        onChange={onCalendarChange}
        placeholder={editDate}
        suffixIcon={false}
      />
      <div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Input value={title} onChange={handleInput} />
        <Button
          onClick={() => {
            handleEdit();
          }}
          type="primary"
          style={{ width: "100%" }}
          size="middle"
        >
          <FaCheck />
        </Button>

        <div className="calendar-dots">
          <div
            onClick={() => {
              handleColor("green");
            }}
            className={`green ${color === "green" && "selected-color"}`}
          />
          <div
            onClick={() => {
              handleColor("red");
            }}
            className={`red ${color === "red" && "selected-color"}`}
          />
          <div
            onClick={() => {
              handleColor("blue");
            }}
            className={`blue ${color === "blue" && "selected-color"}`}
          />
        </div>
      </div>
      <HiMiniXMark
        onClick={() => {
          editDone();
        }}
        size={20}
        style={{ position: "absolute", top: 0, right: 5, cursor: "pointer" }}
      />
    </div>
    // <div className="calendar-adding">
    //   <div className="calendar-input">
    //     <DatePicker
    //       value={dayjs(pickedDate)}
    //       onChange={onCalendarChange}
    //       placeholder={editDate}
    //       suffixIcon={false}
    //       allowClear={false}
    //       variant="borderless"
    //     />
    //     <input value={title} type="text" onChange={handleInput} />
    //   </div>
    //

    //   <Button
    //     onClick={() => {
    //       handleEdit();
    //     }}
    //     className="add-calendar-btn"
    //     type="primary"
    //   >
    //     +
    //   </Button>
    // </div>
  );
};

export default EditCalendarSection;
