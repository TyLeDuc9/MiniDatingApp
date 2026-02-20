import axios from "axios";
import { API } from "../../config/api";
import type {
  RegisterProfilePayload,
  RegisterResponse,
  LoginProfilePayload,
  LoginResponse,
  GetAllProfileResponse,
} from "../../types/profileType";

export const getAllApi = async (): Promise<GetAllProfileResponse> => {
  const res = await axios.get(`${API}/profile/all`);
  return res.data;
};

export const getByMeApi = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API}/profile/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logoutApi = async () => {
  const res = await axios.post(`${API}/profile/logout`);
  return res.data;
};
export const loginApi = async (
  data: LoginProfilePayload,
): Promise<LoginResponse> => {
  const res = await axios.post(`${API}/profile/login`, data);
  return res.data;
};
export const registerApi = async (
  data: RegisterProfilePayload,
): Promise<RegisterResponse> => {
  const res = await axios.post(`${API}/profile/register`, data);
  return res.data;
};
