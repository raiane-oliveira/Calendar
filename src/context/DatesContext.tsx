import { getDaysInMonth, getYear } from "date-fns";
import React, { createContext, useContext, useState } from "react";

interface IDate {
  months: DayOfMonth[][];
  currentDay: Date;
  weekdays: string[];
}

interface Event {
  title: string;
  location?: string;
  isAllDay?: boolean;
  starts?: Date;
  ends?: Date;
  repeat?: string;
  reminders?: string[];
  notes?: string;
}

interface DayOfMonth {
  day: Date;
  events?: Array<Event>;
}

type CalendarContext = {
  calendar: IDate;
  updateCalendar: React.Dispatch<React.SetStateAction<IDate>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateContext = createContext<CalendarContext | null>(null);

interface IDatesProvider {
  children: React.ReactNode;
}

export const DatesProvider = ({ children }: IDatesProvider) => {
  const currentYear = getYear(new Date());
  const [calendar, updateCalendar] = useState<IDate>({
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
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DateContext.Provider
      value={{ calendar, updateCalendar, isModalOpen, setIsModalOpen }}
    >
      {children}
    </DateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendar = () => {
  const calendar = useContext(DateContext);
  if (!calendar) {
    throw new Error("useCalendar has to be used within <DateContext.Provider>");
  }
  return calendar;
};

function returnDaysOfMonth(monthIndex: number, year: number) {
  const amountDaysInMonth = getDaysInMonth(new Date(year, monthIndex));
  const daysOfMonth = [];
  for (let i = 1; i <= amountDaysInMonth; i++) {
    const dateOfMonth = new Date(year, monthIndex, i);
    daysOfMonth.push({
      day: dateOfMonth,
      events: [],
    });
  }

  return daysOfMonth;
}
