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
  'Okt',
  'November',
  'December',
];
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

export const toWeekday = dateString => {
  const day = toDate(dateString).getDay();
  return [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ][day];
}

const twoDigit = s => ('0' + s).substr(-2);
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
