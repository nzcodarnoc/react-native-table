import {
  compareAsc as dateCompareAsc,
  compareDesc as dateCompareDesc,
  parse as parseDate,
} from "date-fns";

const dateFormat = "d/M/y";

function sortNumbers(
  left: Array<string>,
  right: Array<string>,
  direction: number
) {
  const leftFloat = parseFloat(left[0]);
  const rightFloat = parseFloat(right[0]);
  if (leftFloat === rightFloat) return 0;
  return leftFloat > rightFloat ? -1 * direction : 1 * direction;
}

function sortDates(
  left: Array<string>,
  right: Array<string>,
  direction: number
) {
  const leftDate = parseDate(left[1], dateFormat, new Date());
  const rightDate = parseDate(right[1], dateFormat, new Date());
  if (direction === -1) {
    return dateCompareAsc(leftDate, rightDate);
  } else {
    return dateCompareDesc(leftDate, rightDate);
  }
}

export const sortNumbersDesc = (left: Array<string>, right: Array<string>) => {
  return sortNumbers(left, right, 1);
};
export const sortNumbersAsc = (left: Array<string>, right: Array<string>) => {
  return sortNumbers(left, right, -1);
};
export const sortDatesDesc = (left: Array<string>, right: Array<string>) => {
  return sortDates(left, right, 1);
};
export const sortDatesAsc = (left: Array<string>, right: Array<string>) => {
  return sortDates(left, right, -1);
};
