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
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};
