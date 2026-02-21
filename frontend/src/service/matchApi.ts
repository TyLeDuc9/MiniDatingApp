import axios from "axios";
import { API } from "../config/api";
import type {MyMatch} from '../types/matchType'
export const getMyMatchesApi = async (token: string): Promise<MyMatch[]> => {
  const res = await axios.get<MyMatch[]>(
    `${API}/match/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};