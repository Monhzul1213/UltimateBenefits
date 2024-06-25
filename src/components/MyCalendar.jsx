import { Calendar, ConfigProvider } from "antd";
const cellRender = (cur) => {
  // const year = cur.$d.getFullYear();
  // const month = cur.$d.getMonth();
  // const day = cur.$d.getDate();
};
const MyCalendar = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Calendar: {
              miniContentHeight: 10,
            },
          },
        }}
      >
        <Calendar
          cellRender={cellRender}
          fullscreen={false}
          onPanelChange={onPanelChange}
        />
      </ConfigProvider>
    </>
  );
};

export default MyCalendar;
