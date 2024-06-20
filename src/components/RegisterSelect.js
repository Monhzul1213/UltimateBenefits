import { alphabets } from "../constants";
import { Select, ConfigProvider } from "antd";

export function RegisterSelect({ index, onChange }) {
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
        defaultValue="-"
        className="custom-select"
        style={{
          width: 60,
          height: 60,
        }}
        suffixIcon={null}
        onChange={(value) => {
          onChange(value, index);
        }}
        options={alphabets}
      />
    </ConfigProvider>
  );
}
