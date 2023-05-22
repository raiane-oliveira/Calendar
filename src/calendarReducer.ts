interface IDate {
  year: number;
  monthsDetail: {
    months: Date[];
    totalDays: number[];
  };
  currentDay: Date;
  weekdays: string[];
}

interface IAction {
  type: string;
}

export default function calendarReducer(calendar: IDate, action: IAction) {
  switch (action.type) {
    case "addEvent": {
      return [];
    }
  }
}
