import { describe, expect, test } from 'vitest';
import { convertSecondsToHours, convertDecimalToMinutes, getHoursAndMinutes, convertToTwelveHourTime, getWeekWithMovedLateClosings } from './OpeningHours';

describe('The seconds to hours converter', () => {
  test('seconds are converted to hours', () => {
    const input = 7200;
    const expected = 2;
    const actual = convertSecondsToHours(input);
    expect(actual).toEqual(expected);
  });

  test('converts 0 seconds to 0 hours', () => {
    const input = 0;
    const expected = 0;
    const actual = convertSecondsToHours(input);
    expect(actual).toEqual(expected);
  });
});

describe('The decimals to minutes converter', () => {
  test('converts 0 to 0', () => {
    const input = 0;
    const expected = 0;
    const actual = convertDecimalToMinutes(input);
    expect(actual).toEqual(expected);
  })
  test('converts 0.25 to 15', () => {
    const input = 0.25;
    const expected = 15;
    const actual = convertDecimalToMinutes(input);
    expect(actual).toEqual(expected);
  })
});

describe('Takes seconds and rounds to hours and nearest minutes', () => {
  test('rounds 0 to 0 hours and 0 minutes', () => {
    const input = 0;
    const expected = {
      hours: 0,
      minutes: 0,
    };
    const actual = getHoursAndMinutes(input);
    expect(actual).toEqual(expected);
  })

  test('rounds 54321 to 15 hours and 6 minutes', () => {
    const input = 54340;
    const expected = {
      hours: 15,
      minutes: 6,
    };
    const actual = getHoursAndMinutes(input);
    expect(actual).toEqual(expected);
  })
});

describe('Convert 24 hour to 12 hour format', () => {
  test('converts 13 to 1', () => {
    const input = 13;
    const expected = 1;
    const actual = convertToTwelveHourTime(input);
    expect(actual).toEqual(expected);
  })
});

describe('Moves late closings from actual day to same day of opening', () => {
  test('moves a late closing back ', () => {
    const opening = {
      type: 'open',
      value: 63600,
      time: '17:40',
      twelveHourTime: '5:40\u00A0PM',
    }
    const lateClosing = {
      type: 'close',
      value: 100,
      time: '01:40',
      twelveHourTime: '1:40\u00A0AM',
    }
    const input = [
      {
        name: 'monday',
        openingHours: [lateClosing],
      },
      {
        name: 'sunday',
        openingHours: [opening],
      },
    ];
    const expected = [
      {
        name: 'monday',
        openingHours: [],
      },
      {
        name: 'sunday',
        openingHours: [
          opening,
          lateClosing,
        ],
      },
    ];
    const actual = getWeekWithMovedLateClosings(input);
    expect(actual).toEqual(expected);
  })
});