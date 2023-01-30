import { describe, expect, test } from 'vitest';
import { convertSecondsToHours, buildTwelveHourTime } from './OpeningHours';

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

describe('build a twelve hour time from twenty four hours with decimal', () => {
  test('seconds are converted to hours', () => {
    const input = 3.25;
    const expected = '3:15\u00A0AM';
    const actual = buildTwelveHourTime(input);
    expect(actual).toEqual(expected);
  });
});
