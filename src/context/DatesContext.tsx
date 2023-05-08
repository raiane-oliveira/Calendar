import { eachMonthOfInterval, getDaysInMonth, getYear } from "date-fns";
import React, { createContext, useContext, useState } from "react";

const DateContext: React.Context<any> = createContext(undefined);

interface IDate {
  year: number;
  monthsDetail: {
    months: Date[];
    totalDays: number[];
  };
  currentDay: Date;
  weekdays: string[];
}

export const DatesProvider = ({ children }: any) => {
  const currentYear = getYear(new Date());
  const monthsOfThisYear = eachMonthOfInterval({
    start: new Date(currentYear, 0, 1),
    end: new Date(currentYear, 11, 1),
  });

  const dates: IDate = {
    year: currentYear,
    monthsDetail: {
      months: monthsOfThisYear,
      totalDays: monthsOfThisYear.map((month) => getDaysInMonth(month)),
    },
    currentDay: new Date(),
    weekdays: [
      "Mon",
      "Tue",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
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
