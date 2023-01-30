import {
  ReadableDayInterface,
  TimeInterface,
} from '../OpeningHours/OpeningHours';
import { ListItem, Text } from './Schedule.styled';
import Time from '../Time/Time';
import HighlightText from '../HighlightText/HighlightText';

type ScheduleProps = {
  openingHours: Array<ReadableDayInterface>;
};

const adjustDayIndex = (index: number) => (index ? index - 1 : 6);

const Schedule = ({ openingHours }: ScheduleProps) => {
  const dayIndex = new Date().getDay();
  const todayIndex = adjustDayIndex(dayIndex);

  return (
    <ol>
      {openingHours.map((item: ReadableDayInterface, index: number) => {
        return (
          <ListItem key={item.day}>
            <p>
              {item.day}
              {index === todayIndex && <HighlightText>Today</HighlightText>}
            </p>
            {item.readableOpeningHours?.length > 0 ? (
              <Text>
                {item.readableOpeningHours.map(
                  (openingHour: TimeInterface, index: number) => {
                    return (
                      <span key={index}>
                        {index % 2 === 0 ? (
                          <>{index > 1 ? ', ' : ''}</>
                        ) : (
                          <>&nbsp;-&nbsp;</>
                        )}
                        <Time {...openingHour} />
                      </span>
                    );
                  }
                )}
              </Text>
            ) : (
              <Text inactive>Closed</Text>
            )}
          </ListItem>
        );
      })}
    </ol>
  );
};

export default Schedule;
