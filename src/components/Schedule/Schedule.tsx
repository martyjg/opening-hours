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

const adjustDayIndex = (index: number) => (index ? index - 1 : 6);

const Schedule = ({ weeklyOpeningHours }: IScheduleProps) => {
  const dayIndex = new Date().getDay();
  const todayIndex = adjustDayIndex(dayIndex);

  return (
    <ol>
      {weeklyOpeningHours.map((day, dayIndex) => {
        return (
          <Styled.ListItem key={day.name}>
            <Styled.DayText>
              {day.name}
              {dayIndex === todayIndex && <HighlightText>Today</HighlightText>}
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
