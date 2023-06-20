import {
  format,
  getDate,
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
import { AddEventDetails } from "./AddEventDetails";
import { produce } from "immer";

interface IDateState {
  month: number;
  day: number;
}
interface IEvent {
  title: string;
  location?: string;
  isAllDay?: boolean;
  starts?: Date;
  ends?: Date;
  repeat?: string;
  reminders?: string[];
  notes?: string;
}
interface IDayProps {
  index: number;
  day: Date;
  firstDayOfWeekIndex?: number;
  isAnotherMonth?: boolean;
  setMousePosition?: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  dateIndex?: IDateState;
  setDateIndex?: React.Dispatch<React.SetStateAction<IDateState>>;
}

export function Calendar() {
  const { calendar, updateCalendar, isModalOpen, setIsModalOpen } =
    useCalendar();
  const [dateIndex, setDateIndex] = useState<IDateState>({
    month: getMonth(calendar.currentDay),
    day: getDate(calendar.currentDay),
  });
  const [isDetailsActive, setIsDetailsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const day = calendar.months[dateIndex.month][dateIndex.day].day;
  const year = Number(format(calendar.currentDay, "yyyy"));
  const month = format(new Date(Number(year), dateIndex.month, 1), "MMMM");

  const firstDayOfWeekIndex = getDay(new Date(year, dateIndex.month, 1));
  const lastDayOfWeekIndex = getDay(
    lastDayOfMonth(new Date(year, dateIndex.month, 1))
  );

  const listPreviousDays = renderPreviousDays();
  const listNextDays = renderNextDays();

  function onNextMonth() {
    setDateIndex({
      ...dateIndex,
      month: dateIndex.month + 1,
    });

    // Turn back to first month
    if (dateIndex.month === 11) {
      setDateIndex({
        ...dateIndex,
        month: 0,
      });
    }

    if (isModalOpen) setIsModalOpen(false);
  }

  function onPreviousMonth() {
    setDateIndex({
      ...dateIndex,
      month: dateIndex.month - 1,
    });

    // Turn back to last month
    if (dateIndex.month === 0) {
      setDateIndex({
        ...dateIndex,
        month: 11,
      });
    }

    if (isModalOpen) setIsModalOpen(false);
  }

  function renderPreviousDays() {
    const previousMonth = calendar.months[dateIndex.month - 1];

    if (!previousMonth) return;

    // Copies the last days of the previous month based on the remaining weekdays
    const list = previousMonth.slice(
      previousMonth.length - firstDayOfWeekIndex
    );
    return list;
  }

  function renderNextDays() {
    let nextMonth = calendar.months[dateIndex.month + 1];

    if (!nextMonth) {
      nextMonth = calendar.months[0];
    }

    // Copies the first days of the next month based on the remaining weekdays
    const restOfWeek = 6 - lastDayOfWeekIndex;
    const list = nextMonth.slice(0, restOfWeek);
    return list;
  }

  function handleCloseModal() {
    setIsDetailsActive(false);
    setIsModalOpen(false);
  }

  function handleAddEvent(values: IEvent) {
    const newEvent = {
      title: values.title,
      location: values.location ?? "",
      allDay: values.isAllDay ?? true,
      starts: values.starts ?? day,
      ends: values.ends ?? day,
      repeat: values.repeat ?? "no repeat",
      reminders: values.reminders ?? [""],
      notes: values.notes ?? "",
    };
    updateCalendar(
      produce((draft) => {
        draft.months[dateIndex.month][dateIndex.day].events?.push(newEvent);
      })
    );
    handleCloseModal();
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
            listPreviousDays.map((day, index: number) => (
              <DayCalendar
                day={day.day}
                index={index}
                isAnotherMonth={true}
                key={index}
              />
            ))}
          {calendar.months[dateIndex.month].map((day, index: number) => (
            <DayCalendar
              dateIndex={dateIndex}
              setDateIndex={setDateIndex}
              setMousePosition={setMousePosition}
              day={day.day}
              index={index}
              firstDayOfWeekIndex={firstDayOfWeekIndex + 1}
              key={index}
            />
          ))}
          {listNextDays &&
            listNextDays.map((day, index: number) => (
              <DayCalendar
                day={day.day}
                index={index}
                isAnotherMonth={true}
                key={index}
              />
            ))}
        </div>
      </main>

      {isModalOpen && !isDetailsActive
        ? createPortal(
            <Modal
              classes={`bg-black-border`}
              position={{
                y: `${mousePosition.y}px`,
                x: `${mousePosition.x}px`,
              }}
            >
              <AddEvent
                onAddEvent={handleAddEvent}
                setIsDetailsActive={setIsDetailsActive}
                day={day}
              />
            </Modal>,
            document.body
          )
        : isModalOpen &&
          isDetailsActive &&
          createPortal(
            <Modal classes="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <AddEventDetails
                onAddEvent={handleAddEvent}
                onCloseModal={handleCloseModal}
                day={day}
              />
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
  setDateIndex,
  dateIndex,
}) => {
  const { calendar, isModalOpen, setIsModalOpen } = useCalendar();

  const isFirstDay = index === 0;
  const isDayWeekend = isWeekend(day);
  const events = dateIndex && calendar.months[dateIndex.month][index].events;
  const hasEvent = events && events.length > 0;

  function handleOpenModal(e: MouseEvent) {
    const HALF_WIDTH_MODAL = 215;
    if (setMousePosition && dateIndex && setDateIndex) {
      setMousePosition({
        x: e.clientX - HALF_WIDTH_MODAL,
        y: e.clientY + 50,
      });

      setDateIndex({
        ...dateIndex,
        day: getDate(day) - 1,
      });
    }
    setIsModalOpen(!isModalOpen);
  }

  return (
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
      {hasEvent &&
        events.map((event) => (
          <div
            key={event.title}
            className="bg-pink w-max h-max px-1 text-sm rounded-lg"
          >
            {event.title}
          </div>
        ))}
      {/* {calendar.events && isEventSameDay && (
      )} */}
    </div>
  );
};
