import { useEffect, useState } from "react";
import type { FirstCommonSlotResponse } from "../types/availability";
import { findFirstCommonSlotApi } from "../service/availability";

export const useFirstSlotAvailability = (
  matchId: string | null,
  token: string | null
) => {
  const [data, setData] = useState<FirstCommonSlotResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId || !token) return;

    const fetchFirstSlot = async () => {
      try {
        setLoading(true);

        const result = await findFirstCommonSlotApi(matchId, token);
        setData(result);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchFirstSlot();
  }, [matchId, token]);

  return {
    data,
    loading,
    error,
  };
};