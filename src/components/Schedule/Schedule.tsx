import { IOpeningTime } from '../../helpers/formatOpeningHours/formatOpeningHours';
import * as Styled from './Schedule.styled';
import Time from '../Time/Time';
import HighlightText from '../HighlightText/HighlightText';
import useOpeningHours from '../../hooks/useOpeningHours';

// 1. Date object index Sunday as the first day of the week.
// 2. This is adjusted to suit our data where Monday is the first day.
// 3. Build a string to render opening hours in schema format https://schema.org/openingHours for SEO purposes.
const Schedule = () => {
  const { data, isLoading, error } = useOpeningHours();
  const todayIndex = new Date().getDay(); /* 1 */
  const adjustedTodayIndex = todayIndex ? todayIndex - 1 : 6; /* 2 */

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <ol>
      {data.map((day, dayIndex) => {
        const metaContent = day.openingHours /* 3 */
          .map((openingHour: IOpeningTime, openingHoursIndex) => {
            return `${
              openingHoursIndex % 2 === 0
                ? openingHoursIndex > 1
                  ? ', '
                  : ''
                : '-'
            }${openingHour.time}`;
          })
          .join('');
        return (
          <Styled.ListItem key={day.name}>
            {metaContent && (
              <meta
                data-testid='meta-content'
                itemProp='openingHours'
                content={`${day.name[0].toUpperCase()}${
                  day.name[1]
                } ${metaContent}`}
              ></meta>
            )}
            <Styled.DayText>
              {day.name}
              {dayIndex === adjustedTodayIndex && (
                <HighlightText>Today</HighlightText>
              )}
            </Styled.DayText>
            {day.openingHours?.length > 0 ? (
              <Styled.TimeText id='testing'>
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
