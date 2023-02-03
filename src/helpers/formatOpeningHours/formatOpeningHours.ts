export enum OpeningType {
  Open = 'open',
  Close = 'close',
}

export interface IOpeningValue {
  type: OpeningType;
  value: number;
}

export interface IOpeningTime extends IOpeningValue {
  time: string;
  twelveHourTime: string;
}

export interface IDay {
  name: string;
  openingHours: IOpeningTime[];
}

// If a day in the imported data starts with a closing,
// then move that closing to the previous day.
// Therefore closings after midnight are
// rendered on the same day, following it's corresponding opening.
const moveLateClosings = (day: IDay, index: number, array: IDay[]) => {
  if (day.openingHours?.[0]?.type === 'close') {
    array[index - 1]
      ? array[index - 1].openingHours.push(day.openingHours.shift()!)
      : array[array.length - 1].openingHours.push(day.openingHours.shift()!);
  }
};

const cloneWeek = (days: IDay[]) =>
  days.map((day) => {
    return {
      ...day,
      openingHours: day.openingHours.map((openingHour) => openingHour),
    };
  });

const formatOpeningHours = (week: IDay[]) => {
  const formattedWeek = cloneWeek(week);
  formattedWeek.forEach(moveLateClosings);
  return formattedWeek;
};

export default formatOpeningHours;
