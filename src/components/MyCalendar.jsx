import { Calendar, ConfigProvider } from "antd";
import { userCalendarItems } from "../constants";
import { dateFormatter } from "../lib/utils/dateFormatter";
const cellRender = (cur) => {
  const date = dateFormatter(cur.$d);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
      {userCalendarItems.calendarItems.map((item, idx) => {
        if (item.date === date) {
          return (
            <div
              key={item.date + idx}
              className={`calendar-small-dot ${item.color}`}
            />
          );
        }
      })}
    </div>
  );
};
export const MyCalendar = () => {
  return (
    <div className="calendar-wrapper">
      <ConfigProvider
        theme={{
          components: {
            Calendar: {
              miniContentHeight: 100,
              lineWidth: 1,
            },
          },
        }}
      >
        <Calendar cellRender={cellRender} fullscreen={false} />
      </ConfigProvider>
    </div>
  );
};
