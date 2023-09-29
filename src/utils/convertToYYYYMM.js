export const convertToYYYYMM = (input) => {
  const [month, year] = input.split("/").map(Number);
  const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year

  // Use a threshold (e.g., 10 years) to determine the century
  const threshold = 10;
  const prefix = year <= currentYear + threshold ? "20" : "19"; // Determine the century

  // Pad the month with a leading zero if it's a single digit
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedYear = `${prefix}${year}`;

  return `${formattedYear}-${formattedMonth}`;
};
