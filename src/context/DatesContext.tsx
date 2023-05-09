import { eachMonthOfInterval, getDaysInMonth, getYear } from "date-fns";
import React, { createContext, useContext, useState } from "react";

const DateContext: React.Context<any> = createContext(undefined);

interface IDate {
  months: Date[][];
  currentDay: Date;
  weekdays: string[];
}

export const DatesProvider = ({ children }: any) => {
  const currentYear = getYear(new Date());
  const dates: IDate = {
    currentDay: new Date(),
    months: [
      returnDaysOfMonth(0, currentYear),
      returnDaysOfMonth(1, currentYear),
      returnDaysOfMonth(2, currentYear),
      returnDaysOfMonth(3, currentYear),
      returnDaysOfMonth(4, currentYear),
      returnDaysOfMonth(5, currentYear),
      returnDaysOfMonth(6, currentYear),
      returnDaysOfMonth(7, currentYear),
      returnDaysOfMonth(8, currentYear),
      returnDaysOfMonth(9, currentYear),
      returnDaysOfMonth(10, currentYear),
      returnDaysOfMonth(11, currentYear),
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  };

  const [calendar, setCalendar] = useState<IDate>(dates);

  return (
    <DateContext.Provider value={{ calendar, setCalendar }}>
      {children}
    </DateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendar = () => useContext(DateContext);

function returnDaysOfMonth(monthIndex: number, year: number) {
  const amountDaysInMonth = getDaysInMonth(new Date(year, monthIndex));
  const daysOfMonth = [];
  for (let i = 1; i <= amountDaysInMonth; i++) {
    const dateOfMonth = new Date(year, monthIndex, i);
    daysOfMonth.push(dateOfMonth);
  }

  return daysOfMonth;
}
