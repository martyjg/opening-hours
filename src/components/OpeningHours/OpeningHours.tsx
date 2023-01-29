import data from '../../data.json';
import { Container, Card, Heading } from './OpeningHours.styled';

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
    if (clopening?.type === 'open') {
      readableOpeningHours += convertSecondsToHours(clopening.value);
    }
    if (clopening?.type === 'close') {
      readableOpeningHours += ` - ${convertSecondsToHours(clopening.value)}`;
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
              <li key={item.day}>
                <span>{item.day}</span>
                {item.readableOpeningHours?.length > 0
                  ? item.readableOpeningHours.join(', ')
                  : 'Closed'}
              </li>
            );
          })}
        </ol>
      </Card>
    </Container>
  );
};

export default OpeningHours;
