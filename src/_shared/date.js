/**
 * @param s {string}
 * @return {Date}
 */
const toDate = s => {
  const parts = s.split(' ');
  if (parts.length > 1) {
    const validDate = `${parts[0]}T${parts[1]}+01:00`; // NOTE: Timezone CET is assumed always!!!!
    return new Date(validDate);
  }
  return new Date(s);
}

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
  'October',
  'November',
  'December',
];
/**
 * @param dateString {string}
 * @return {string}
 */
export const toReadableDate = dateString => {
  const isYearAndMonthOnly = dateString.split('-').length === 2;
  const date = toDate(dateString);
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return isYearAndMonthOnly
    ? `${month} ${year}`
    : `${month} ${date.getDate()}, ${year}`
  ;
};
/**
 * @param dateString {string}
 * @return {string}
 */
export const toReadableYearAndMonth = dateString =>
  toReadableDate(dateString.split('-').slice(0, 2).join('-'));
/**
 * @param dateString {string}
 * @return {string}
 */
export const toWeekday = dateString => {
  const day = toDate(dateString).getDay();
  return [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ][day];
}
/**
 * @param s {number}
 * @return {string}
 */
const twoDigit = s => ('0' + s).substr(-2);
/**
 * @param now {Date}
 * @return {string}
 */
export const nowAsDateTimeString = (now = new Date()) => {
  // NOTE only works for CET ... cest la vie ;)
  const dateParts = [
    now.getFullYear(),
    twoDigit(now.getMonth()+1),
    twoDigit(now.getDate()),
  ];
  const timeParts = [
    twoDigit(now.getUTCHours()+1) + ':' + twoDigit(now.getMinutes()),
    'CET'
  ];
  return [dateParts.join('-'), ...timeParts].join(' ');
};
