import { useEffect, useState } from "react";
import { getAllAvailabilityApi } from "../service/availability";
import type { GetAllAvailabilityOfMeResponse } from "../types/availability";

export const useAllAvailability = (token: string | null) => {
  const [availabilities, setAvailabilities] =
    useState<GetAllAvailabilityOfMeResponse>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchAvailability = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllAvailabilityApi(token);
        setAvailabilities(data);

        console.log("API DATA:", data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [token]);

  return {
    availabilities,
    loading,
    error,
  };
};