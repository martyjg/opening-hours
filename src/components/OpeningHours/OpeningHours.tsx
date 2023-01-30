import data from '../../data.json';
import {
  Container,
  Card,
  Heading,
  ExtendedClockIcon,
} from './OpeningHours.styled';
import Schedule from '../Schedule/Schedule';

// TODO:
// Do an opening hours schema

interface Clopening {
  type: string;
  value: number;
}

export interface TimeInterface {
  time: string;
  twelveHourClock: string;
}

interface Day {
  day: string;
  clopenings: Array<Clopening>;
}
export interface ReadableDayInterface extends Day {
  readableOpeningHours: Array<TimeInterface>;
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
  if (item.clopenings?.[0]?.type === 'close') {
    array[index - 1]
      ? array[index - 1]['clopenings'].push(item.clopenings.shift()!)
      : array[array.length - 1]['clopenings'].push(item.clopenings.shift()!);
  }
};

const buildFormattedOpenHours = (clopenings: Array<Clopening>) => {
  return clopenings?.map((clopening: Clopening) => {
    const timeInHours = convertSecondsToHours(clopening.value);
    return {
      time: buildTwentyFourTime(timeInHours),
      twelveHourClock: buildTwelveHourTime(timeInHours),
    };
  });
};

const weeklyOpeningHours: Array<Day> = data
  ? Object.entries(data).map((dayOpeningHoursPairs) => {
      return {
        day: dayOpeningHoursPairs[0],
        clopenings: dayOpeningHoursPairs[1],
      };
    })
  : [];

weeklyOpeningHours.forEach(moveLateClosings);

const openingHours: Array<ReadableDayInterface> = weeklyOpeningHours
  ? weeklyOpeningHours.map((dailyOpeningHours: Day) => {
      return {
        readableOpeningHours: buildFormattedOpenHours(
          dailyOpeningHours.clopenings
        ),
        ...dailyOpeningHours,
      };
    })
  : [];

const OpeningHours = () => {
  return (
    <Container>
      <Card>
        <Heading>
          <ExtendedClockIcon />
          Opening Hours
        </Heading>
        <Schedule openingHours={openingHours} />
      </Card>
    </Container>
  );
};

export default OpeningHours;
