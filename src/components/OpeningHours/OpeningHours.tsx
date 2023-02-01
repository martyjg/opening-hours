import data from '../../data.json';
import * as Styled from './OpeningHours.styled';
import Schedule from '../Schedule/Schedule';

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

export const convertSecondsToHours = (value: number) => value / 60 / 60;

// Given a decimal value between 0 and 1, return it expressed
// between 0 and 60 and rounded to the nearest minute.
export const convertDecimalToMinutes = (value: number) =>
  Math.round(value * 10 * 6);

// Given a number of seconds, return it in hours and minutes.
export const getHoursAndMinutes = (seconds: number) => {
  const hoursWithDecimal = convertSecondsToHours(seconds);
  let hours = Math.trunc(hoursWithDecimal);
  let minutes = convertDecimalToMinutes(hoursWithDecimal - hours);
  if (minutes === 60) {
    hours = hours + 1;
    minutes = 0;
  }
  if (hours === 24) {
    hours = 0;
  }
  return { hours, minutes };
};

// Given an hour between 0 and 24, return it to between 0 and 12 according
// as 12-hour clock form.
export const convertToTwelveHourTime = (hours: number) => {
  if (hours < 1) {
    return hours + 12;
  }
  if (hours > 12) {
    return hours - 12;
  }
  return hours;
};

// Give a number of seconds after midnight,
// return a string for 24-hour clock and a string for 12-hour clock.
const buildOpenHours = (value: number) => {
  const { hours, minutes } = getHoursAndMinutes(value);
  return {
    time: `${hours < 10 ? `0${hours}` : hours}:${
      minutes ? `${minutes < 10 ? `0${minutes}` : minutes}` : '00'
    }`,
    twelveHourTime: `${convertToTwelveHourTime(hours)}${
      minutes ? `:${minutes < 10 ? `0${minutes}` : minutes}` : ''
    }\u00A0${hours >= 12 ? 'PM' : 'AM'}`,
  };
};

// If a day in the imported data starts with a closing,
// then move it that closing the previous day.
// Therefore closings after midnight are
// rendered on the same day after it's corresponding opening.
const moveLateClosings = (day: Day, index: number, array: Day[]) => {
  if (day.openingHours?.[0]?.type === 'close') {
    array[index - 1]
      ? array[index - 1].openingHours.push(day.openingHours.shift()!)
      : array[array.length - 1].openingHours.push(day.openingHours.shift()!);
  }
};

export const getWeekWithMovedLateClosings = (week: Day[]) => {
  week.forEach(moveLateClosings);
  return week;
};

const OpeningHours = () => {
  // Take the data import and reformat it into an array with various time formats.
  const weeklyOpeningHours: Day[] = Object.entries(data).map(
    (dayOpeningHoursPairs) => ({
      name: dayOpeningHoursPairs[0],
      openingHours: dayOpeningHoursPairs[1].map((openingHour) => ({
        ...buildOpenHours(openingHour.value),
        ...openingHour,
      })),
    })
  );

  const schedule = getWeekWithMovedLateClosings(weeklyOpeningHours);

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Heading>
          <Styled.ExtendedClockIcon />
          Opening Hours
        </Styled.Heading>
        <Schedule weeklyOpeningHours={schedule} />
      </Styled.Card>
    </Styled.Container>
  );
};

export default OpeningHours;
