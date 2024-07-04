import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateWithYMD(date) {
  return format(new Date(date), "yyyy-MM-dd");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function parseISODuration(isoDuration) {
  const durationRegex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/;
  const matches = isoDuration.match(durationRegex);

  if (!matches) {
    throw new Error("Invalid ISO 8601 duration format");
  }

  return {
    days: parseInt(matches[1] || 0, 10),
    hours: parseInt(matches[2] || 0, 10),
    minutes: parseInt(matches[3] || 0, 10),
  };
}

export function formatISODuration(isoDuration) {
  const { days, hours, minutes } = parseISODuration(isoDuration);

  const formattedDuration = [
    days ? `${days}d` : "",
    hours ? `${hours}h` : "",
    minutes ? `${minutes}m` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return formattedDuration;
}
