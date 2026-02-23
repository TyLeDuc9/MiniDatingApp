export const isPastSlot = (date: string, from: string) => {
  if (!date) return false;
  const now = new Date();
  const selectedDate = new Date(date);
  if (selectedDate.toDateString() !== now.toDateString()) {
    return false;
  }

  const [hour, minute] = from.split(":").map(Number);

  const slotTime = new Date(selectedDate);
  slotTime.setHours(hour, minute, 0, 0);

  return slotTime <= now;
};
