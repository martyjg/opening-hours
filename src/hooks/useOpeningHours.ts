import data from '../data.json';
import buildOpeningHours from '../helpers/buildOpeningHours/buildOpeningHours';
import formatOpeningHours, { IOpeningValue } from '../helpers/formatOpeningHours/formatOpeningHours';

enum DayOfTheWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export type OpeningHoursData = Partial<Record<DayOfTheWeek, IOpeningValue[]>>;

// Take the data import and reformat it into an array with various time formats.
export const deriveWeeklyOpeningHours = (data: OpeningHoursData) => Object.entries(data).map(
  (dayOpeningHoursPairs) => ({
    name: dayOpeningHoursPairs[0],
    openingHours: Array.isArray(dayOpeningHoursPairs[1]) ? dayOpeningHoursPairs[1].map((openingHour) => ({
      ...buildOpeningHours(openingHour.value),
      ...openingHour,
    })) : [],
  })
);

const useWeeklyOpeningHours = () => {
  const week = deriveWeeklyOpeningHours(data);
  return formatOpeningHours(week);
};

export default useWeeklyOpeningHours