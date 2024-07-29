"use client";
import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";
import { dateFormatWithYear } from "../../lib/utils/dateFormatter";
import { alert } from "../../lib/actions/alert.actions";

export const calendarContext = createContext({
  calendarItems: [{}],
  dayItems: {},
  calendarLoading: false,
  calenderFailed: false,
  retryCalendarData: () => {},
  getDayItems: () => {},
  getCalendarItems: () => {},
  addCalendar: () => {},
  editCalendar: () => {},
  deleteCalendar: () => {},
});

const CalendarProvider = ({ children }) => {
  const { user } = useAuth();
  const userToken = sessionStorage.getItem("userToken");
  const [calendarItems, setCalendarItems] = useState();
  const [dayItems, setDayItems] = useState();
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calenderFailed, setCalendarFailed] = useState(false);

  const getCalendarItems = async (year) => {
    try {
      const { data } = await myAxios.get(`/api/calendar/getCalendars/${year}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setCalendarItems(data.result);
    } catch (error) {
      setCalendarFailed(true);
    }
  };

  const getDayItems = async (day) => {
    setCalendarLoading(true);
    setCalendarFailed(false);
    try {
      const { data } = await myAxios.get(`/api/calendar/getCalendar/${day}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setDayItems(data);
    } catch (error) {
      setCalendarFailed(true);
    } finally {
      setCalendarLoading(false);
    }
  };

  const addCalendar = async (RestDate, Descr, Color) => {
    try {
      const { data } = await myAxios.post(
        "/api/calendar",
        {
          RestDate,
          Descr,
          Color,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert(data.message, "success");
      getCalendarItems(RestDate);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const editCalendar = async (id, RestDate, Descr, Color) => {
    try {
      const { data } = await myAxios.put(
        `/api/calendar/${id}`,
        {
          RestDate,
          Descr,
          Color,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      getCalendarItems(RestDate);
      alert(data.message, "success");
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const deleteCalendar = async (id, RestDate) => {
    try {
      const { data } = await myAxios.delete(`/api/calendar/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      getCalendarItems(data.result);
      getDayItems(data.result);
      alert(data.message, "success");
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  useEffect(() => {
    if (userToken) {
      getCalendarItems(dateFormatWithYear(new Date()));
      getDayItems(dateFormatWithYear(new Date()));
    }
  }, [user, userToken]);
  const retryCalendarData = () => {
    if (userToken) {
      getCalendarItems(dateFormatWithYear(new Date()));
      getDayItems(dateFormatWithYear(new Date()));
    }
  };
  return (
    <calendarContext.Provider
      value={{
        calendarItems,
        dayItems,
        calendarLoading,
        calenderFailed,
        retryCalendarData,
        getDayItems,
        getCalendarItems,
        addCalendar,
        editCalendar,
        deleteCalendar,
      }}
    >
      {children}
    </calendarContext.Provider>
  );
};

export default CalendarProvider;

export const useCalendar = () => {
  return useContext(calendarContext);
};
