import data from '../../data.json';
import { Container, Card, Heading, ListItem } from './OpeningHours.styled';

// TODO:
// Set day indicator
// Do an opening hours schema

interface Clopening {
  type: string;
  value: number;
}
interface Day {
  day: string;
  clopenings: Array<Clopening | undefined>;
}

interface ReadableDay extends Day {
  readableOpeningHours: Array<string>;
}

export const convertSecondsToHours = (value: number) => value / 60 / 60;

const convertDecimalToMinutes = (value: number) => value * 10 * 6;

const convertTwentyFourToTwelveHour = (value: number) => {
  let clock = 'AM';
  let hour = Math.trunc(value);
  const decimal = value - hour;
  const minutes = convertDecimalToMinutes(decimal);
  if (hour > 12) {
    hour = hour % 12;
    clock = 'PM';
  }
  return `${hour}${minutes ? `:${minutes}` : ''} ${clock}`;
};

const moveLateClosings = (item: Day, index: number, array: Array<Day>) => {
  if (item.clopenings?.[0]?.type === 'close') {
    array[index - 1]
      ? array[index - 1]['clopenings'].push(item.clopenings.shift())
      : array[array.length - 1]['clopenings'].push(item.clopenings.shift());
  }
};

const buildReadableOpenHours = (clopenings: Array<Clopening | undefined>) => {
  let openings: Array<string> = [];
  let readableOpeningHours = '';
  openings = clopenings.reduce((acc: Array<string>, clopening) => {
    const value = clopening
      ? convertTwentyFourToTwelveHour(convertSecondsToHours(clopening.value))
      : 0;
    if (clopening?.type === 'open') {
      readableOpeningHours += value;
    }
    if (clopening?.type === 'close') {
      readableOpeningHours += ` - ${value}`;
      acc.push(readableOpeningHours);
      readableOpeningHours = '';
    }
    return acc;
  }, []);
  return openings;
};

const weeklyOpeningHours: Array<Day> = Object.entries(data).map(
  (dailyOpeningHours) => ({
    day: dailyOpeningHours[0],
    clopenings: dailyOpeningHours[1],
  })
);

weeklyOpeningHours.forEach(moveLateClosings);

const openingHours: Array<ReadableDay> = weeklyOpeningHours.map(
  (dailyOpeningHours: Day) => {
    return {
      readableOpeningHours: buildReadableOpenHours(
        dailyOpeningHours.clopenings
      ),
      ...dailyOpeningHours,
    };
  }
);

const OpeningHours = () => {
  return (
    <Container>
      <Card>
        <Heading>Opening Hours</Heading>
        <ol>
          {openingHours.map((item) => {
            return (
              <ListItem key={item.day}>
                <span>{item.day}</span>
                {item.readableOpeningHours?.length > 0
                  ? item.readableOpeningHours.join(', ')
                  : 'Closed'}
              </ListItem>
            );
          })}
        </ol>
      </Card>
    </Container>
  );
};

export default OpeningHours;
