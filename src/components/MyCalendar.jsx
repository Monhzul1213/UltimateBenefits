import { Calendar, ConfigProvider, Tooltip } from "antd";
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
        if (
          item.BeginDate <= date &&
          item.EndDate >= date &&
          item.Year == year
        ) {
          return (
            <Tooltip title={item.Descr}>
              <div
                key={item.BeginDate + idx}
                className={`calendar-small-dot ${item.Color}`}
              />
            </Tooltip>
          );
        }
      })}
    </div>
  );
};
export const MyCalendar = () => {
  const { getDayItems, getCalendarItems } = useCalendar();
  const handleChange = (cur) => {
    getDayItems(dateFormatWithYear(cur.$d));
    // getCalendarItems(dateFormatWithYear(cur.$d));
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
          onSelect={handleChange}
          cellRender={CellRender}
          fullscreen={false}
        />
      </ConfigProvider>
    </div>
  );
};
