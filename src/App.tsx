import { format, getMonth, isWeekend, setMonth } from "date-fns";
import { useCalendar } from "./context/DatesContext";
import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

function App() {
  const { calendar } = useCalendar();
  const [monthIndex, setMonthIndex] = useState(getMonth(calendar.currentDay));

  const year = format(calendar.currentDay, "yyyy");
  const month = format(new Date(Number(year), monthIndex, 1), "MMMM");

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
    <div className="container grid col-auto mx-auto">
      <div className=" bg-black text-white rounded-lg py-6 px-10">
        <header className="flex justify-between items-center px-1 py-6 font-bold text-4xl">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={monthIndex < 0}
              onClick={onPreviousMonth}
            >
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
          <div className="grid grid-cols-7 p-0.5 gap-0.5 bg-black-border overflow-hidden">
            {calendar.months[monthIndex].map((day: Date, index: number) => {
              const isFirstDay = index === 0;
              const isDayWeekend = isWeekend(day);
              return (
                <div
                  key={index}
                  className={`grid p-2 w-full h-44 ${
                    isDayWeekend ? " bg-black-dark" : "bg-black"
                  } ${isFirstDay && "col-start-2"}`}
                >
                  <span className="justify-self-end font-semibold">
                    {format(day, "d")}
                  </span>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
