import { describe, expect, test } from 'vitest';
import { convertSecondsToHours, convertDecimalToMinutes, } from './OpeningHours';

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
})

// describe('build a twenty four hour time with minutes', () => {
//   test('15.25 is converted to "15:15"', () => {
//     const input = 15.25;
//     const expected = '15:15';
//     const actual = buildTwentyFourHourTime(input);
//     expect(actual).toEqual(expected);    
//   })
// })

// describe('build a twelve hour time time with minutes', () => {
//   test('15.25 is converted to "3:15 PM"', () => {
//     const input = 15.25;
//     const expected = '3:15\u00A0PM';
//     const actual = buildTwelveHourTime(input);
//     expect(actual).toEqual(expected);
//   });

//   test('23.99 is converted to "11:59 PM"', () => {
//     const input = 23.99;
//     const expected = '11:59\u00A0PM';
//     const actual = buildTwelveHourTime(input);
//     expect(actual).toEqual(expected);
//   });

//   test('11.99 is converted to "11:59 AM"', () => {
//     const input = 11.99;
//     const expected = '11:59\u00A0AM';
//     const actual = buildTwelveHourTime(input);
//     expect(actual).toEqual(expected);
//   });

//   test('11.9997222222 is converted to "12:00 PM"', () => {
//     const input = 11.9997222222;
//     const expected = '12:00\u00A0PM';
//     const actual = buildTwelveHourTime(input);
//     expect(actual).toEqual(expected);
//   });

//   test('23.9997222222 is converted to "12:00 AM"', () => {
//     const input = 23.9997222222;
//     const expected = '12:00\u00A0AM';
//     const actual = buildTwelveHourTime(input);
//     expect(actual).toEqual(expected);
//   });

//   test('0 is converted to "12 AM"', () => {
//     const input = 0;
//     const expected = '12\u00A0AM';
//     const actual = buildTwelveHourTime(input);
//     expect(actual).toEqual(expected);
//   });

//   test('12 is converted to "12 PM"', () => {
//     const input = 12;
//     const expected = '12\u00A0PM';
//     const actual = buildTwelveHourTime(input);
//     expect(actual).toEqual(expected);
//   });
});
