import {  useState } from "react";
import { likeApi } from "../service/likeApi";
import type { LikePayload, LikeResponse } from "../types/likeType";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useLike = (
  setLikedUserIds?: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LikeResponse | null>(null);
  const currentUser = useSelector((state: RootState) => state.profile.profile);

  
  const likeUser = async (payload: LikePayload) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Chưa đăng nhập");
      const res = await likeApi(payload, token);
      setResult(res);
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };
  const handleLike = async (toUser: string) => {
    if (!currentUser?._id) {
      toast.error("Bạn cần đăng nhập");
      return;
    }
    const res = await likeUser({
      fromUser: currentUser._id,
      toUser,
    });
    setLikedUserIds?.((prev) => [...prev, toUser]);

    if (res?.match) {
      toast.success("It's a Match!");
    }
  };
  return {
    likeUser,
    loading,
    error,
    result,
    currentUser,
    handleLike,
  };
};
