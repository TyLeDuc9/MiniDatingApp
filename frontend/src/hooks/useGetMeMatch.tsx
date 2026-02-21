import { useEffect, useState } from "react";
import { getMyMatchesApi } from "../service/matchApi";
import type { MyMatch } from "../types/matchType";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
export const useGetMeMatch = () => {
  const [matches, setMatches] = useState<MyMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.profile.profile);
 
  useEffect(() => {
    const fetchMatches = async () => {
      if (!currentUser?._id) return;
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getMyMatchesApi(token);
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [currentUser?._id]);

  return { matches, loading, error, currentUser };
};
