import axios from "axios";
import { API } from "../config/api";
import type {
  FirstCommonSlotResponse,
  SaveAvailabilityResponse,
  AvailabilitySlot,
  GetAllAvailabilityOfMeResponse,
} from "../types/availability";

export const getAllAvailabilityApi = async (
  token: string,
): Promise<GetAllAvailabilityOfMeResponse> => {
  const res = await axios.get(`${API}/availability/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const findFirstCommonSlotApi = async (
  matchId: string,
  token: string,
): Promise<FirstCommonSlotResponse> => {
  const res = await axios.get(`${API}/availability/${matchId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const getAvailabilityByIdApi = async (
  matchId: string,
  token: string,
) => {
  const res = await axios.get(`${API}/availability/me/${matchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const saveAvailabilityApi = async (
  matchId: string,
  slots: AvailabilitySlot[],
  token: string,
): Promise<SaveAvailabilityResponse> => {
  const res = await axios.post<SaveAvailabilityResponse>(
    `${API}/availability`,
    {
      matchId,
      slots,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const firstAvailabilityApi = async (
  matchId: string,
  token: string,
): Promise<FirstCommonSlotResponse> => {
  const res = await axios.get<FirstCommonSlotResponse>(
    `${API}/availability/${matchId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
