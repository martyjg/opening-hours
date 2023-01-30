import {
  ReadableDayInterface,
  TimeInterface,
} from '../OpeningHours/OpeningHours';
import { ListItem, DayText, TimeText } from './Schedule.styled';
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
            <DayText>
              {item.day}
              {index === todayIndex && <HighlightText>Today</HighlightText>}
            </DayText>
            {item.readableOpeningHours?.length > 0 ? (
              <TimeText>
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
              </TimeText>
            ) : (
              <TimeText inactive>Closed</TimeText>
            )}
          </ListItem>
        );
      })}
    </ol>
  );
};

export default Schedule;
