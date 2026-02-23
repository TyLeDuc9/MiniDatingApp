import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { getMyLikesApi } from "../service/likeApi";

export const useGetMeLike = () => {
  const [likedUserIds, setLikedUserIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    const fetchMyLikes = async () => {
      const token = localStorage.getItem("token");
      if (!currentUser?._id) return;

      try {
        setLoading(true);
        if (!token) return;
        const res = await getMyLikesApi(token);
        setLikedUserIds(res.likedUserIds);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchMyLikes();
  }, [currentUser?._id]);

  return {
    likedUserIds,
    setLikedUserIds,
    loading,
    error,
  };
};
