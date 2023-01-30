import {
  ReadableDayInterface,
  TimeInterface,
} from '../OpeningHours/OpeningHours';
import * as Styled from './Schedule.styled';
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
          <Styled.ListItem key={item.day}>
            <Styled.DayText>
              {item.day}
              {index === todayIndex && <HighlightText>Today</HighlightText>}
            </Styled.DayText>
            {item.openingHours?.length > 0 ? (
              <Styled.TimeText>
                {item.openingHours.map(
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
              </Styled.TimeText>
            ) : (
              <Styled.TimeText inactive>Closed</Styled.TimeText>
            )}
          </Styled.ListItem>
        );
      })}
    </ol>
  );
};

export default Schedule;
