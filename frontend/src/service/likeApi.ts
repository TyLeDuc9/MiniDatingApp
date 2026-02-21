import axios from "axios";
import { API } from "../config/api";
import type {
  LikeResponse,
  LikePayload,
  GetMyLikesResponse,
} from "../types/likeType";
export const getMyLikesApi = async (token: string) => {
  const res = await axios.get<GetMyLikesResponse>(`${API}/like/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const likeApi = async (
  payload: LikePayload,
  token: string,
): Promise<LikeResponse> => {
  const res = await axios.post(`${API}/like`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
