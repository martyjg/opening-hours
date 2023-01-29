import { describe, expect, test } from 'vitest'
import { convertSecondsToHours } from './OpeningHours'

describe('The seconds to hours converter', () => {
  test('seconds are converted to hours', () => {
    const input = 7200
    const expected = 2
    const actual = convertSecondsToHours(input)
    expect(actual).toEqual(expected)
  })
  
  test('converts 0 seconds to 0 hours', () => {
    const input = 0
    const expected = 0
    const actual = convertSecondsToHours(input)
    expect(actual).toEqual(expected)
  })
})