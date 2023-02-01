import data from '../data.json';
import buildOpeningHours from '../helpers/buildOpeningHours/buildOpeningHours';
import formatOpeningHours, { IDay } from '../helpers/formatOpeningHours/formatOpeningHours';

enum DayOfTheWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

// export enum ActionType {
//   open = 'open',
//   close = 'close'
// }

interface IOpeningHour {
  type: string;
  value: number;
}

export type OpeningHoursResponse = Partial<Record<DayOfTheWeek, IOpeningHour[]>>;

// Take the data import and reformat it into an array with various time formats.
export const deriveWeeklyOpeningHours = (data: OpeningHoursResponse): IDay[] => Object.entries(data).map(
  (dayOpeningHoursPairs) => ({
    name: dayOpeningHoursPairs[0],
    openingHours: Array.isArray(dayOpeningHoursPairs[1]) ? dayOpeningHoursPairs[1].map((openingHour) => ({
      ...buildOpeningHours(openingHour.value),
      ...openingHour,
    })) : [],
  })
);

const useWeeklyOpeningHours = () => {
  return formatOpeningHours(deriveWeeklyOpeningHours(data));
};

export default useWeeklyOpeningHours