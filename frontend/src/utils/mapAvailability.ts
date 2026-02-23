import { TIME_SLOTS } from "../constants/timeSlots";
import type {AvailabilitySlot} from '../types/availability'


export const mapApiToConfirmedSlots = (
  slots: AvailabilitySlot[]
): Record<string, number[]> => {
  const result: Record<string, number[]> = {};

  slots.forEach((slot) => {
    const index = TIME_SLOTS.findIndex(
      ([from, to]) => from === slot.from && to === slot.to
    );
    if (index === -1) return;

    if (!result[slot.date]) result[slot.date] = [];
    result[slot.date].push(index);
  });

  return result;
};