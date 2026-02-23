import { useEffect, useState } from "react";
import { getAvailabilityByIdApi } from "../service/availability";
import type { AvailabilitySlot } from "../types/availability";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
export const useAvailabilityMe = (
  matchId: string | null,
  token: string | null,
) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!matchId || !token || !currentUser?._id) return;
      try {
        setLoading(true);
        setError(null);
        const data: AvailabilitySlot[] = await getAvailabilityByIdApi(
          matchId,
          token,
        );
        setSlots(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [matchId, token, currentUser?._id]);
  return {
    slots,
    loading,
    error,
  };
};
