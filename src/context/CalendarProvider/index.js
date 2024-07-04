"use client";
import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";
import { dateFormatWithYear } from "../../lib/utils/dateFormatter";
import { alert } from "../../lib/actions/alert.actions";

export const calendarContext = createContext({
  calendarItems: [{}],
  dayItems: {},
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

  const getCalendarItems = async (year) => {
    try {
      const { data } = await myAxios.get(`/api/calendar/getCalendars/${year}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setCalendarItems(data.result);
      console.log("CALENDER ITEMS", data.result);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  const getDayItems = async (day) => {
    try {
      const { data } = await myAxios.get(`/api/calendar/getCalendar/${day}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setDayItems(data);
      console.log("One calender item", data.result);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  const addCalendar = async (Today, Descr, Color) => {
    try {
      const { data } = await myAxios.post(
        "/api/calendar",
        {
          Today,
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
      getCalendarItems(Today);
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const editCalendar = async (id, Today, Descr, Color) => {
    try {
      const { data } = await myAxios.put(
        `/api/calendar/${id}`,
        {
          Today,
          Descr,
          Color,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const deleteCalendar = async () => {
    try {
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
  return (
    <calendarContext.Provider
      value={{
        calendarItems,
        dayItems,
        getDayItems,
        getCalendarItems,
        addCalendar,
        editCalendar,
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
