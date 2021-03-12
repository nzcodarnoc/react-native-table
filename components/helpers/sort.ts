import {
  compareAsc as dateCompareAsc,
  compareDesc as dateCompareDesc,
  parse as parseDate,
} from "date-fns";
import { TransactionRowData } from "../TransactionTable";

const dateFormat = "d/M/y";

function sortNumbers(
  left: TransactionRowData,
  right: TransactionRowData,
  direction: number
) {
  const leftFloat = parseFloat(left.value[0]);
  const rightFloat = parseFloat(right.value[0]);
  if (leftFloat === rightFloat) return 0;
  return leftFloat > rightFloat ? -1 * direction : 1 * direction;
}

function sortDates(
  left: TransactionRowData,
  right: TransactionRowData,
  direction: number
) {
  const leftDate = parseDate(left.value[1], dateFormat, new Date());
  const rightDate = parseDate(right.value[1], dateFormat, new Date());
  if (direction === -1) {
    return dateCompareAsc(leftDate, rightDate);
  } else {
    return dateCompareDesc(leftDate, rightDate);
  }
}
function sortStrings(
  left: TransactionRowData,
  right: TransactionRowData,
  direction: number
) {
  if (left === right) return 0;
  return left > right ? -1 * direction : 1 * direction;
}
export const sortNumbersDesc = (
  left: TransactionRowData,
  right: TransactionRowData
) => {
  return sortNumbers(left, right, 1);
};
export const sortNumbersAsc = (
  left: TransactionRowData,
  right: TransactionRowData
) => {
  return sortNumbers(left, right, -1);
};
export const sortDatesDesc = (
  left: TransactionRowData,
  right: TransactionRowData
) => {
  return sortDates(left, right, 1);
};
export const sortDatesAsc = (
  left: TransactionRowData,
  right: TransactionRowData
) => {
  return sortDates(left, right, -1);
};
export const sortStringsDesc = (
  left: TransactionRowData,
  right: TransactionRowData
) => {
  return sortStrings(left, right, 1);
};
export const sortStringsAsc = (
  left: TransactionRowData,
  right: TransactionRowData
) => {
  return sortStrings(left, right, -1);
};
