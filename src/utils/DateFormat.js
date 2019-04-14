const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const parseDate = (dateObj, showMonth = false) => {
  const month = months[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  return showMonth ? `${month} ${year}` : `${year}`;
};

export const templateDate = (strs, start, end) => {
  const dateObjStart = parseDate(new Date(start), true);
  const dateObjEnd = parseDate(new Date(end));
  return `${strs[0]}${dateObjStart}${strs[1]}${dateObjEnd}${strs[2]}`;
};
