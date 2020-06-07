import {describe, it} from 'mocha';
import * as assert from 'assert';
import {toReadableDate, toReadableYearAndMonth, toWeekday, nowAsDateTimeString} from './date.js';

describe('Convert date (and time) to a readable date string', () => {
  describe('GIVEN a date', () => {
    it('e.g. "2001-01-01" WHEN converted THEN return "January 1, 2001"', () => {
      assert.strictEqual(toReadableDate('2001-01-01'), 'January 1, 2001');
    });
    it('e.g. "2042-11-11" WHEN converted THEN return "November 11, 2042"', () => {
      assert.strictEqual(toReadableDate('2042-11-11'), 'November 11, 2042');
    });
  });
  describe('GIVEN a date+time', () => {
    it('e.g. "2042-11-11 10:00 CET" WHEN converted THEN return "November 11, 2042"', () => {
      assert.strictEqual(toReadableDate('2042-11-11 10:00 CET'), 'November 11, 2042');
    });
  });
  describe('GIVEN a year and month only', () => {
    it('e.g. "2042-11" WHEN converted THEN return "November 2042"', () => {
      assert.strictEqual(toReadableDate('2042-11'), 'November 2042');
    });
  });
});

describe('Return the weekday for a date', () => {
  it('GIVEN a date only THEN return the weekday', () => {
    assert.strictEqual(toWeekday('2001-01-01'), 'Monday');
  });
  it('GIVEN a date+time only THEN return the weekday', () => {
    assert.strictEqual(toWeekday('2001-01-01 10:00 CET'), 'Monday');
  });
});

describe('Return now as a DateTime string', () => {
  it('GIVEN a date instance WHEN converting it to a BlogPost DateTime string THEN do so ;)', () => {
    const now = new Date('2001-01-01 10:00+01:00');
    assert.strictEqual(nowAsDateTimeString(now), '2001-01-01 10:00 CET');
  });
});

describe('Return a readable string containing year+month only', () => {
  it('GIVEN a date string THEN return something like "January 2001"', () => {
    assert.strictEqual(toReadableYearAndMonth('2001-01-01'), 'January 2001');
  });
});