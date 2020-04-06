import {describe, it} from 'mocha';
import assert from 'assert';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Okt',
  'November',
  'December',
];
const toReadableDate = dateString => {
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

describe('Convert date to a readable string', () => {
  it('GIVEN a date "2001-01-01" WHEN converted THEN return "January 1, 2001"', () => {
    assert.strictEqual(toReadableDate('2001-01-01'), 'January 1, 2001');
  });
  it('GIVEN a date "2042-11-11" WHEN converted THEN return "November 11, 2042"', () => {
    assert.strictEqual(toReadableDate('2042-11-11'), 'November 11, 2042');
  });
});
