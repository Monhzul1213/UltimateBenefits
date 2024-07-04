import { Calendar, ConfigProvider } from "antd";
import {
  dateFormatWithYear,
  dateFormatter,
  getYear,
} from "../lib/utils/dateFormatter";
import { useCalendar } from "../context/CalendarProvider";
const CellRender = (cur) => {
  const { calendarItems } = useCalendar();
  const date = dateFormatter(cur.$d);
  const year = getYear(cur.$d);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
      {calendarItems?.map((item, idx) => {
        if (item?.RestDate == date && item?.Year === year) {
          return (
            <div
              key={item.RestDate + idx}
              className={`calendar-small-dot ${item.Color}`}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
export const MyCalendar = () => {
  const { getDayItems, getCalendarItems } = useCalendar();
  const handlePanel = (cur) => {
    getCalendarItems(dateFormatWithYear(cur.$d));
  };
  const handleChange = (cur) => {
    getDayItems(dateFormatWithYear(cur.$d));
  };
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
        <Calendar
          onPanelChange={handlePanel}
          onSelect={handleChange}
          cellRender={CellRender}
          fullscreen={false}
        />
      </ConfigProvider>
    </div>
  );
};
