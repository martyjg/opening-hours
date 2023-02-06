import buildOpeningHours from '../helpers/buildOpeningHours/buildOpeningHours';
import formatOpeningHours, {
  IOpeningValue,
} from '../helpers/formatOpeningHours/formatOpeningHours';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../constants';

enum DayOfTheWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
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
  return axios(`${BASE_URL}/data.json`).then((response) => response.data);
};

const useOpeningHours = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['openingHours'],
    queryFn: fetchOpeningHours,
  });

  console.log('data: ', data);

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
