const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const getAvailabilityDateRange = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = formatDate(today);
  const max = new Date(today);
  max.setDate(today.getDate() + 21);
  const maxDate = formatDate(max);

  return { minDate, maxDate };
};