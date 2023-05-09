import { format, getDate } from "date-fns";
import { useCalendar } from "./context/DatesContext";

function App() {
  const { calendar } = useCalendar();
  console.log(calendar);

  const currentMonth = format(calendar.currentDay, "MMMM");
  const monthKey = format(calendar.currentDay, "MMM").toLowerCase();
  const year = format(calendar.currentDay, "yyyy");
  return (
    <div className="container grid col-auto">
      <div className=" bg-black text-white rounded-lg p-6">
        <header className="flex justify-between items-center px-1 py-6 font-bold text-4xl">
          <h1>{currentMonth}</h1>
          <h2 className="text-black-border tracking-wider">{year}</h2>
        </header>
        <main>
          <header className="grid grid-cols-7 justify-items-end font-normal text-sm text-white text-opacity-60">
            {calendar.weekdays.map((weekday: string) => (
              <span key={weekday} className=" pr-2">
                {weekday}
              </span>
            ))}
          </header>
          <div className="grid grid-cols-7 p-0.5 gap-0.5 bg-black-border">
            {calendar.months[monthKey].map((day: Date, index: number) => {
              const isFirstDay = index === 0;
              return (
                <div
                  key={index}
                  className={`grid bg-black p-2 w-full h-44 ${
                    isFirstDay && "col-start-6"
                  }`}
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
