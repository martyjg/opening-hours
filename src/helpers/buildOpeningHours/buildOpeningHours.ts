export const convertSecondsToHours = (value: number) => value / 60 / 60;

// Given a decimal value between 0 and 1, return it expressed
// between 0 and 60 and rounded to the nearest minute.
export const convertDecimalToMinutes = (value: number) =>
  Math.round(value * 10 * 6);

// Given a number of seconds, return it in hours and minutes.
export const getHoursAndMinutes = (seconds: number) => {
  const hoursWithDecimal = convertSecondsToHours(seconds);
  const hours = Math.trunc(hoursWithDecimal);
  const minutes = convertDecimalToMinutes(hoursWithDecimal - hours);
  if (minutes === 60) {
    return {
      hours: hours + 1,
      minutes: 0
    }
  }
  if (hours === 24) {
    return {
      hours: 0,
      minutes
    }
  }
  return { hours, minutes };

};

// Given an hour between 0 and 24, return it to between 0 and 12 according
// as 12-hour clock form.
export const convertToTwelveHourTime = (hours: number) => {
  if (hours < 1) {
    return hours + 12;
  }
  if (hours > 12) {
    return hours - 12;
  }
  return hours;
};

// Give a number of seconds after midnight,
// return a string for 24-hour clock and a string for 12-hour clock.
const buildOpeningHours = (value: number) => {
  const { hours, minutes } = getHoursAndMinutes(value);
  const hoursInTwentyFourHour = hours < 10 ? `0${hours}` : hours;
  const hoursInTwelveHour = convertToTwelveHourTime(hours);
  const minutesInTwentyFourHour = minutes ? `${minutes < 10 ? `0${minutes}` : minutes}` : '00';  
  const minutesInTwelveHour = minutes ? `:${minutes < 10 ? `0${minutes}` : minutes}` : '';
  
  return {
    time: `${hoursInTwentyFourHour}:${minutesInTwentyFourHour}`,
    twelveHourTime: `${hoursInTwelveHour}${minutesInTwelveHour}\u00A0${hours >= 12 ? 'PM' : 'AM'}`,
  };
};

export default buildOpeningHours;