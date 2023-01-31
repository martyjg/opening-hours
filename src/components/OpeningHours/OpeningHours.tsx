import data from '../../data.json';
import * as Styled from './OpeningHours.styled';
import Schedule from '../Schedule/Schedule';

// TODO:
// Do an opening hours schema
// Write more tests

interface OpeningValue {
  type: string;
  value: number;
}

export interface OpeningTime extends OpeningValue {
  time: string;
  twelveHourClock: string;
}

export interface Day {
  name: string;
  openingHours: Array<OpeningValue | OpeningTime>;
}

export const convertSecondsToHours = (value: number) => value / 60 / 60;

export const convertDecimalToMinutes = (value: number) => Math.round(value * 10 * 6);

export const getHoursAndMinutes = (seconds: number) => {
  const hoursWithDecimal = convertSecondsToHours(seconds)
  let hours = Math.trunc(hoursWithDecimal);
  let minutes = convertDecimalToMinutes(hoursWithDecimal - hours);
  if (minutes === 60) {
    hours = hours + 1;
    minutes = 0;
  }
  if (hours === 24) {
    hours = 0;
  }
  return { hours, minutes }
};

export const convertToTwelveHourTime = (hours: number) => {
  if (hours < 1) {
    return hours + 12;
  }
  if (hours > 12) {
    return hours - 12;
  }
  return hours;
};

const moveLateClosings = (day: Day, index: number, array: Array<Day>) => {
  if (day.openingHours?.[0]?.type === 'close') {
    array[index - 1]
      ? array[index - 1]['openingHours'].push(day.openingHours.shift()!)
      : array[array.length - 1]['openingHours'].push(
          day.openingHours.shift()!
        );
  }
};

const buildOpenHours = (value: number) => {
  const { hours, minutes } = getHoursAndMinutes(value);
  return {
    time: `${hours < 10 ? `0${hours}` : hours}:${minutes ? `${minutes < 10 ? `0${minutes}` : minutes}` : '00'}`,
    twelveHourTime: `${convertToTwelveHourTime(hours)}${minutes ? `:${minutes < 10 ? `0${minutes}` : minutes}` : ''}\u00A0${hours >= 12 ? 'PM' : 'AM'}`,
  };
};

const weeklyOpeningHours: Array<Day> = Object.entries(data).map(
  (dayOpeningHoursPairs) => {
    return {
      name: dayOpeningHoursPairs[0],
      openingHours: dayOpeningHoursPairs[1].map((openingHour) => {
        return {
          ...buildOpenHours(openingHour.value),
          ...openingHour,
        };
      }),
    };
  }
);

weeklyOpeningHours.forEach(moveLateClosings);

const OpeningHours = () => {
  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Heading>
          <Styled.ExtendedClockIcon />
          Opening Hours
        </Styled.Heading>
        <Schedule weeklyOpeningHours={weeklyOpeningHours} />
      </Styled.Card>
    </Styled.Container>
  );
};

export default OpeningHours;
