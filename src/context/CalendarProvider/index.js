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
    } catch (error) {
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };

  const addCalendar = async (RestDate, Descr, Color) => {
    console.log("RESTDATE", RestDate);
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
      console.log("ERROR IN POST CALENDAR", error);
      if (!error.response) {
        alert("Уучлаарай, сүлжээ унасан байна", "error");
      } else {
        alert(error.response.data.error.message, "error");
      }
    }
  };
  const editCalendar = async (id, RestDate, Descr, Color) => {
    console.log("UPDATING CALENDER", id, RestDate, Descr, Color);
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
  return (
    <calendarContext.Provider
      value={{
        calendarItems,
        dayItems,
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
