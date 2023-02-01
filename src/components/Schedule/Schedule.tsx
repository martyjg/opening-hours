import {
  IDay,
  IOpeningTime,
} from '../../helpers/formatOpeningHours/formatOpeningHours';
import * as Styled from './Schedule.styled';
import Time from '../Time/Time';
import HighlightText from '../HighlightText/HighlightText';

interface IScheduleProps {
  weeklyOpeningHours: IDay[];
}

// 1. Date object index Sunday as the first day of the week.
// 2. This is adjusted to suit our data where Monday is the first day.
const Schedule = ({ weeklyOpeningHours }: IScheduleProps) => {
  const todayIndex = new Date().getDay(); /* 1 */
  const adjustedTodayIndex = todayIndex ? todayIndex - 1 : 6; /* 2 */

  return (
    <ol>
      {weeklyOpeningHours.map((day, dayIndex) => {
        return (
          <Styled.ListItem key={day.name}>
            <Styled.DayText>
              {day.name}
              {dayIndex === adjustedTodayIndex && (
                <HighlightText>Today</HighlightText>
              )}
            </Styled.DayText>
            {day.openingHours?.length > 0 ? (
              <Styled.TimeText>
                {day.openingHours.map(
                  (openingHour: IOpeningTime, openingHoursIndex) => {
                    return (
                      <span key={openingHoursIndex}>
                        {openingHoursIndex % 2 === 0 ? (
                          <>{openingHoursIndex > 1 ? ', ' : ''}</>
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
