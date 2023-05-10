import { format, getDay, getMonth, isSameDay, isWeekend } from "date-fns";
import { useCalendar } from "../context/DatesContext";
import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export function Calendar() {
  const { calendar } = useCalendar();
  const [monthIndex, setMonthIndex] = useState(getMonth(calendar.currentDay));

  const year = format(calendar.currentDay, "yyyy");
  const month = format(new Date(Number(year), monthIndex, 1), "MMMM");

  const firstDayOfWeekIndex = getDay(new Date(Number(year), monthIndex, 1)) + 1;
  console.log(firstDayOfWeekIndex);

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
          {calendar.months[monthIndex].map((day: Date, index: number) => {
            const isFirstDay = index === 0;
            const isDayWeekend = isWeekend(day);
            return (
              <div
                key={index}
                className={`grid p-2 w-full h-44 ${
                  isFirstDay && " col-start-" + firstDayOfWeekIndex.toString()
                } ${isDayWeekend ? " bg-black-dark" : "bg-black"}`}
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
          })}
        </div>
      </main>
    </div>
  );
}
