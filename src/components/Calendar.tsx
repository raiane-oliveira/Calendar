import {
  format,
  getDay,
  getMonth,
  isSameDay,
  isWeekend,
  lastDayOfMonth,
} from "date-fns";
import { useCalendar } from "../context/DatesContext";
import React, { MouseEvent, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";
import { AddEvent } from "./AddEvent";

interface IDayProps {
  index: number;
  day: Date;
  firstDayOfWeekIndex?: number;
  isAnotherMonth?: boolean;
  setMousePosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
}

export function Calendar() {
  const { calendar, isModalOpen, setIsModalOpen } = useCalendar();

  // The initial state setting is the current month
  const [monthIndex, setMonthIndex] = useState(getMonth(calendar.currentDay));
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const year = Number(format(calendar.currentDay, "yyyy"));
  const month = format(new Date(Number(year), monthIndex, 1), "MMMM");

  const firstDayOfWeekIndex = getDay(new Date(year, monthIndex, 1));
  const lastDayOfWeekIndex = getDay(
    lastDayOfMonth(new Date(year, monthIndex, 1))
  );

  const listPreviousDays = renderPreviousDays();
  const listNextDays = renderNextDays();

  function onNextMonth() {
    setMonthIndex(monthIndex + 1);

    // Turn back to first month
    if (monthIndex === 11) {
      setMonthIndex(0);
    }

    // Close modal if it's open
    if (isModalOpen) setIsModalOpen(false);
  }

  function onPreviousMonth() {
    setMonthIndex(monthIndex - 1);

    // Turn back to last month
    if (monthIndex === 0) {
      setMonthIndex(11);
    }

    // Close modal if it's open
    if (isModalOpen) setIsModalOpen(false);
  }

  function renderPreviousDays() {
    const previousMonth = calendar.months[monthIndex - 1];

    if (!previousMonth) return;

    // Copies the last days of the previous month based on the remaining weekdays
    const list = previousMonth.slice(
      previousMonth.length - firstDayOfWeekIndex
    );
    return list;
  }

  function renderNextDays() {
    let nextMonth = calendar.months[monthIndex + 1];

    // Returns first month
    if (!nextMonth) {
      nextMonth = calendar.months[0];
    }

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
          {listPreviousDays &&
            listPreviousDays.map((day: Date, index: number) => (
              <DayCalendar
                setMousePosition={setMousePosition}
                day={day}
                index={index}
                isAnotherMonth={true}
                key={index}
              />
            ))}
          {calendar.months[monthIndex].map((day: Date, index: number) => (
            <DayCalendar
              setMousePosition={setMousePosition}
              day={day}
              index={index}
              firstDayOfWeekIndex={firstDayOfWeekIndex + 1}
              key={index}
            />
          ))}
          {listNextDays &&
            listNextDays.map((day: Date, index: number) => (
              <DayCalendar
                setMousePosition={setMousePosition}
                day={day}
                index={index}
                isAnotherMonth={true}
                key={index}
              />
            ))}
        </div>
      </main>

      {isModalOpen &&
        createPortal(
          <Modal
            classes={`bg-black-border p-6`}
            position={{
              y: `${mousePosition.y}px`,
              x: `${mousePosition.x}px`,
            }}
          >
            <AddEvent day="May 25" />
          </Modal>,
          document.body
        )}
    </div>
  );
}

const DayCalendar: React.FC<IDayProps> = ({
  day,
  index,
  firstDayOfWeekIndex,
  isAnotherMonth = false,
  setMousePosition,
}) => {
  const { calendar, isModalOpen, setIsModalOpen } = useCalendar();

  const isFirstDay = index === 0;
  const isDayWeekend = isWeekend(day);

  function handleOpenModal(e: MouseEvent) {
    const HALF_WIDTH_MODAL = 215;
    setMousePosition({
      x: e.clientX - HALF_WIDTH_MODAL,
      y: e.clientY,
    });
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div
        className={`grid p-2 w-full h-44 cursor-pointer ${
          isFirstDay && " col-start-" + firstDayOfWeekIndex
        } ${isDayWeekend ? " bg-black-dark" : "bg-black"}
        ${isAnotherMonth && " opacity-60"}
      `}
        onClick={
          !isAnotherMonth
            ? handleOpenModal
            : () => {
                return;
              }
        }
      >
        <span
          className={`justify-self-end font-semibold ${
            isSameDay(day, calendar.currentDay) &&
            "bg-blue px-2 py-1 rounded-full h-max"
          }`}
        >
          {format(day, "d")}
        </span>
      </div>
    </>
  );
};
