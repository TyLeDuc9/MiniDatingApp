import { useEffect, useState } from "react";
import { saveAvailabilityApi } from "../service/availability";
import type { AvailabilitySlot } from "../types/availability";
import { TIME_SLOTS } from "../constants/timeSlots";
import { isPastSlot } from "../utils/pastSlot";
import { toast } from "react-toastify";

export const useChooseDate = (mySlots: AvailabilitySlot[] = []) => {
  const token = localStorage.getItem("token");
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [confirmedSlots, setConfirmedSlots] = useState<
    Record<string, number[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mySlots.length) return;
    const map: Record<string, number[]> = {};

    mySlots.forEach((slot) => {
      const index = TIME_SLOTS.findIndex(
        ([from, to]) => from === slot.from && to === slot.to,
      );

      if (index !== -1) {
        if (!map[slot.date]) map[slot.date] = [];
        map[slot.date].push(index);
      }
    });

    setConfirmedSlots(map);
  }, [mySlots]);


  const toggleSlot = (index: number) => {
    if (!date) return;
    if (confirmedSlots[date]?.includes(index)) return;

    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index],
    );
  };

  const isDisabledSlot = (from: string) => {
    return !date || isPastSlot(date, from);
  };


  const handleConfirm = async (matchId: string) => {
    if (!date) {
      toast.error("Bạn cần chọn ngày");
      return;
    }
    if (selected.length === 0) {
      toast.error("Bạn cần chọn ít nhất 1 khung giờ");
      return;
    }
    if (!token) {
      toast.error("Chưa đăng nhập");
      return;
    }

    const payload: AvailabilitySlot[] = selected.map((i) => ({
      date,
      from: TIME_SLOTS[i][0],
      to: TIME_SLOTS[i][1],
    }));

    try {
      setLoading(true);
      await saveAvailabilityApi(matchId, payload, token);

      setConfirmedSlots((prev) => ({
        ...prev,
        [date]: Array.from(new Set([...(prev[date] || []), ...selected])),
      }));

      setSelected([]);
      toast.success("Lưu lịch hẹn thành công");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    date,
    setDate,
    selected,
    confirmedSlots,
    toggleSlot,
    isDisabledSlot,
    handleConfirm,
    TIME_SLOTS,
    loading,
    error,
  };
};