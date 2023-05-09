import { eachMonthOfInterval, getDaysInMonth, getYear } from "date-fns";
import React, { createContext, useContext, useState } from "react";

const DateContext: React.Context<any> = createContext(undefined);

interface IDate {
  months: {
    jan: Date[];
    fev: Date[];
    mar: Date[];
    apr: Date[];
    may: Date[];
    jun: Date[];
    jul: Date[];
    aug: Date[];
    sep: Date[];
    oct: Date[];
    nov: Date[];
    dec: Date[];
  };
  currentDay: Date;
  weekdays: string[];
}

export const DatesProvider = ({ children }: any) => {
  const currentYear = getYear(new Date());
  const dates: IDate = {
    currentDay: new Date(),
    months: {
      jan: returnDaysOfMonth(0, currentYear),
      fev: returnDaysOfMonth(1, currentYear),
      mar: returnDaysOfMonth(2, currentYear),
      apr: returnDaysOfMonth(3, currentYear),
      may: returnDaysOfMonth(4, currentYear),
      jun: returnDaysOfMonth(5, currentYear),
      jul: returnDaysOfMonth(6, currentYear),
      aug: returnDaysOfMonth(7, currentYear),
      sep: returnDaysOfMonth(8, currentYear),
      oct: returnDaysOfMonth(9, currentYear),
      nov: returnDaysOfMonth(10, currentYear),
      dec: returnDaysOfMonth(11, currentYear),
    },
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
