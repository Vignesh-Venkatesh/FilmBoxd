export function isFutureDate(dateStr: string): boolean {
  const inputDate = new Date(dateStr);
  const today = new Date();

  return inputDate > today;
}
