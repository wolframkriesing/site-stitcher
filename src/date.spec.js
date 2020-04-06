import {describe, it} from 'mocha';
import assert from 'assert';
import {toReadableDate} from './date.js';

describe('Convert date to a readable string', () => {
  it('GIVEN a date "2001-01-01" WHEN converted THEN return "January 1, 2001"', () => {
    assert.strictEqual(toReadableDate('2001-01-01'), 'January 1, 2001');
  });
  it('GIVEN a date "2042-11-11" WHEN converted THEN return "November 11, 2042"', () => {
    assert.strictEqual(toReadableDate('2042-11-11'), 'November 11, 2042');
  });
});
