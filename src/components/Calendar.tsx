import {
  format,
  getDay,
  getMonth,
  isSameDay,
  isWeekend,
  lastDayOfMonth,
  lastDayOfWeek,
} from "date-fns";
import { useCalendar } from "../context/DatesContext";
import React, { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface IDayProps {
  index: number;
  day: Date;
  firstDayOfWeekIndex?: number;
  isAnotherMonth?: boolean;
}

export function Calendar() {
  const { calendar } = useCalendar();

  // The initial state setting is the current month
  const [monthIndex, setMonthIndex] = useState(getMonth(calendar.currentDay));

  const year = Number(format(calendar.currentDay, "yyyy"));
  const month = format(new Date(Number(year), monthIndex, 1), "MMMM");

  const firstDayOfWeekIndex = getDay(new Date(year, monthIndex, 1));
  const lastDayMonth = lastDayOfMonth(new Date(year, monthIndex, 1));
  const lastDayOfWeekIndex = getDay(lastDayMonth);

  const listPreviousDays = renderPreviousDays();
  const listNextDays = renderNextDays();

  function onNextMonth() {
    setMonthIndex(monthIndex + 1);

    // Turn back to first month
    if (monthIndex === 11) {
      setMonthIndex(0);
    }
  }

  function onPreviousMonth() {
    setMonthIndex(monthIndex - 1);

    // Turn back to last month
    if (monthIndex === 0) {
      setMonthIndex(11);
    }
  }

  function renderPreviousDays() {
    const previousMonth = calendar.months[monthIndex - 1];

    // Copies the last days of the previous month based on the remaining weekdays
    const list = previousMonth.slice(
      previousMonth.length - firstDayOfWeekIndex
    );
    return list;
  }

  function renderNextDays() {
    const nextMonth = calendar.months[monthIndex + 1];

    // Copies the first days of the next month based on the remaining weekdays
    const restOfWeek = 6 - lastDayOfWeekIndex;
    const list = nextMonth.slice(0, restOfWeek);
    return list;
  }

  return (
    <div className=" bg-black text-white rounded-lg py-6 px-10">
      <header className="flex justify-between items-center px-1 py-6 font-bold text-4xl">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onPreviousMonth}>
            <CaretLeft size={24} />
          </button>
          <h1>{month}</h1>
          <button type="button" onClick={onNextMonth}>
            <CaretRight size={24} />
          </button>
        </div>
        <h2 className="text-black-border tracking-wider">{year}</h2>
      </header>
      <main>
        <header className="grid grid-cols-7 justify-items-end font-normal text-sm text-white text-opacity-60">
          {calendar.weekdays.map((weekday: string) => (
            <span key={weekday} className="pr-2">
              {weekday}
            </span>
          ))}
        </header>
        <div className="grid grid-flow-row grid-cols-7 p-0.5 gap-0.5 bg-black-border">
          {listPreviousDays.map((day: Date, index: number) => (
            <DayCalendar
              day={day}
              index={index}
              isAnotherMonth={true}
              key={index}
            />
          ))}
          {calendar.months[monthIndex].map((day: Date, index: number) => (
            <DayCalendar
              day={day}
              index={index}
              firstDayOfWeekIndex={firstDayOfWeekIndex + 1}
              key={index}
            />
          ))}
          {listNextDays.map((day: Date, index: number) => (
            <DayCalendar
              day={day}
              index={index}
              isAnotherMonth={true}
              key={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const DayCalendar: React.FC<IDayProps> = ({
  day,
  index,
  firstDayOfWeekIndex,
  isAnotherMonth = false,
}) => {
  const { calendar } = useCalendar();
  const isFirstDay = index === 0;
  const isDayWeekend = isWeekend(day);

  return (
    <div
      className={`grid p-2 w-full h-44 ${
        isFirstDay && " col-start-" + firstDayOfWeekIndex
      } ${isDayWeekend ? " bg-black-dark" : "bg-black"}
        ${isAnotherMonth && " opacity-60"}
      `}
    >
      <span
        className={`justify-self-end font-semibold ${
          isSameDay(day, calendar.currentDay) &&
          "bg-blue p-2 rounded-full h-max"
        }`}
      >
        {format(day, "d")}
      </span>
    </div>
  );
};