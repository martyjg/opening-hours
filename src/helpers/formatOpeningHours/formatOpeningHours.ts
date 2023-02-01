// TODO:
// Do an opening hours SEO schema

export interface IOpeningTime {
  time: string;
  twelveHourTime: string;
  type: string;
  value: number;
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

const formatOpeningHours = (week: IDay[]) => {
  week.forEach(moveLateClosings);
  return week;
};

export default formatOpeningHours;