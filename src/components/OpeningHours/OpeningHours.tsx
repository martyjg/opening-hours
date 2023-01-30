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

interface OpeningTime extends OpeningValue {
  time: string;
  twelveHourClock: string;
}

interface Day {
  day: string;
  openingHours: Array<OpeningValue | OpeningTime>;
}

export const convertSecondsToHours = (value: number) => value / 60 / 60;

const convertDecimalToMinutes = (value: number) => value * 10 * 6;

const buildTwentyFourTime = (value: number) => {
  let hour = Math.trunc(value);
  const decimal = value - hour;
  const minutes = convertDecimalToMinutes(decimal);
  return `${hour}:${minutes ? `${minutes}` : '00'}`;
};

export const buildTwelveHourTime = (value: number) => {
  let clock = 'AM';
  let hour = Math.trunc(value);
  const decimal = value - hour;
  const minutes = convertDecimalToMinutes(decimal);
  if (hour > 12) {
    hour = hour % 12;
    clock = 'PM';
  }
  return `${hour}${minutes ? `:${minutes}` : ''}\u00A0${clock}`;
};

const moveLateClosings = (item: Day, index: number, array: Array<Day>) => {
  if (item.openingHours?.[0]?.type === 'close') {
    array[index - 1]
      ? array[index - 1]['openingHours'].push(item.openingHours.shift()!)
      : array[array.length - 1]['openingHours'].push(
          item.openingHours.shift()!
        );
  }
};

const buildFormattedOpenHours = (opening: OpeningValue) => {
  const timeInHours = convertSecondsToHours(opening.value);
  return {
    time: buildTwentyFourTime(timeInHours),
    twelveHourClock: buildTwelveHourTime(timeInHours),
  };
};

const weeklyOpeningHours: Array<Day> = Object.entries(data).map(
  (dayOpeningHoursPairs) => {
    return {
      day: dayOpeningHoursPairs[0],
      openingHours: dayOpeningHoursPairs[1].map((openingHour) => {
        return {
          ...buildFormattedOpenHours(openingHour),
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
        <Schedule openingHours={weeklyOpeningHours} />
      </Styled.Card>
    </Styled.Container>
  );
};

export default OpeningHours;
