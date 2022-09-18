import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
