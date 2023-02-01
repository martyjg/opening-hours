import { describe, expect, test } from 'vitest';
import formatOpeningHours from './formatOpeningHours';

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
    const actual = formatOpeningHours(input);
    expect(actual).toEqual(expected);
  })
});