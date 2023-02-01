// TODO:
// Do an opening hours SEO schema

export interface OpeningTime {
  time: string;
  twelveHourTime: string;
  type: string;
  value: number;
}

export interface Day {
  name: string;
  openingHours: OpeningTime[];
}

// If a day in the imported data starts with a closing,
// then move that closing to the previous day.
// Therefore closings after midnight are
// rendered on the same day, following it's corresponding opening.
const moveLateClosings = (day: Day, index: number, array: Day[]) => {
  if (day.openingHours?.[0]?.type === 'close') {
    array[index - 1]
      ? array[index - 1].openingHours.push(day.openingHours.shift()!)
      : array[array.length - 1].openingHours.push(day.openingHours.shift()!);
  }
};

const formatOpeningHours = (week: Day[]) => {
  week.forEach(moveLateClosings);
  return week;
};

export default formatOpeningHours;