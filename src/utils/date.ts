// Utility function to get the last N(could be any number) days in 'YYYY-MM-DD' format
export function getLastNDays(date: Date, subDays: number) {
  date.setDate(date.getDate() - subDays);
  return date.toISOString().split("T")[0];
}

// Utility function to validate the date format (YYYY-MM-DD)
export function isValidDate(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}
