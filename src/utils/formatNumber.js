import numeral from "numeral";

export function fDecimalNumber(number) {
  return numeral(number).format("0,0.00");
}
