import React from "react";
import { alphabets } from "../constants";
import { Select, ConfigProvider } from "antd";

export function RegisterSelect() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorPrimary: "#E6E7E8",
          },
        },
      }}
    >
      <Select
        defaultValue="У"
        className="custom-select"
        style={{
          width: 60,
          height: 60,
        }}
        suffixIcon={null}
        onChange={handleChange}
        options={alphabets}
      />
    </ConfigProvider>
  );
}
