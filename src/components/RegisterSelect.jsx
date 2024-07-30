import { useState } from "react";
import { alphabets } from "../constants";
import { Select, ConfigProvider, Popover, Button } from "antd";
import { useTraining } from "../context/TrainProvider";

export function RegisterSelect({
  index,
  onChange,
  open,
  setOpen,
  registerLetters,
  focusInput,
  handleSelectKeyDown,
}) {
  const content = (
    <div className="alphabets-container">
      {alphabets.map((item) => (
        <div
          onClick={() => {
            setOpen(index + 1);
            onChange(item.value, index);
            if (index === 1) {
              focusInput();
            }
          }}
          className="alphabet"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
  return (
    <>
      <Popover
        onOpenChange={() => {
          if (open === index) {
            setOpen(null);
          } else {
            setOpen(index);
          }
        }}
        open={open === index}
        placement="bottomLeft"
        content={content}
        trigger="click"
      >
        <Button className="register-number-button">
          {registerLetters[index] ? registerLetters[index] : "-"}
        </Button>
      </Popover>
      {/* <Button
        onClick={() => {
          downloadFile("public/socialProvisionCategory/1.pdf");
        }}
      >
        Tatah
      </Button> */}
    </>
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Select: {
    //         colorPrimary: "#E6E7E8",
    //       },
    //     },
    //   }}
    // >
    //   <Select
    //     defaultValue="-"
    //     className="custom-select ant-select-selector-login"
    //     style={{
    //       width: 60,
    //       height: 60,
    //     }}
    //     suffixIcon={null}
    //     onChange={(value) => {
    //       onChange(value, index);
    //     }}
    //     options={alphabets}
    //   />
    // </ConfigProvider>
  );
}
