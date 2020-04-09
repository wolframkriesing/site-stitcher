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
  const date = toDate(dateString);
  const month = months[date.getMonth()];
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

export const toWeekday = dateString => {
  const day = toDate(dateString).getDay();
  return [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ][day];
}
