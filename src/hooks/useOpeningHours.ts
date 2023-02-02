import buildOpeningHours from '../helpers/buildOpeningHours/buildOpeningHours';
import formatOpeningHours, {
  IOpeningValue,
} from '../helpers/formatOpeningHours/formatOpeningHours';
import { useQuery } from '@tanstack/react-query';

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
export const deriveWeeklyOpeningHours = (data: OpeningHoursData) =>
  Object.entries(data).map((dayOpeningHoursPairs) => ({
    name: dayOpeningHoursPairs[0],
    openingHours: Array.isArray(dayOpeningHoursPairs[1])
      ? dayOpeningHoursPairs[1].map((openingHour) => ({
          ...buildOpeningHours(openingHour.value),
          ...openingHour,
        }))
      : [],
  }));

const fetchOpeningHours = (): Promise<OpeningHoursData> => {
  return fetch('data.json').then((response) => response.json());
};

const useOpeningHours = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['openingHours'],
    queryFn: fetchOpeningHours,
  });

  if (error) {
    console.error(error);
  }

  return {
    data: data ? formatOpeningHours(deriveWeeklyOpeningHours(data)) : [],
    isLoading,
    error,
  };
};

export default useOpeningHours;
