"use client";
import { createContext, useContext, useEffect, useState } from "react";
import myAxios from "../../lib/axios";
import { useAuth } from "../AuthProvider";
import { dateFormatWithYear } from "../../lib/utils/dateFormatter";

export const calendarContext = createContext({
  calendarItems: [{}],
  dayItems: {},
  getDayItems: () => {},
  getCalendarItems: () => {},
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
      console.log("Calendar items", data.result);
      setCalendarItems(data.result);
    } catch (error) {
      console.log("Error in getCalendarItems", error);
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
      console.log("Error in getDayItems", error);
    }
  };

  useEffect(() => {
    if (userToken) {
      getCalendarItems("2024");
      getDayItems(dateFormatWithYear(new Date()));
    }
  }, [user]);
  return (
    <calendarContext.Provider
      value={{
        calendarItems,
        dayItems,
        getDayItems,
        getCalendarItems,
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
