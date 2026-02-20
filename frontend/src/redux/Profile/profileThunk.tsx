import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi, loginApi, logoutApi, getByMeApi , getAllApi} from "./profileApi";
import axios from "axios";
import type {
  RegisterProfilePayload,
  RegisterResponse,
  LoginProfilePayload,
  LoginResponse,
  GetAllProfileResponse
} from "../../types/profileType";
export const getAllProfile = createAsyncThunk<
  GetAllProfileResponse,
  void,
  { rejectValue: string }
>("profile/all", async (_, { rejectWithValue }) => {
  try {
    return await getAllApi();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Get all profile failed"
      );
    }
    return rejectWithValue("Get all profile failed");
  }
});
export const getMeProfile = createAsyncThunk(
  "profile/me",
  async (_, { rejectWithValue }) => {
    try {
      return await getByMeApi();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Unauthorized",
        );
      }
      return rejectWithValue("Unauthorized");
    }
  },
);
export const logoutProfile = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("profile/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutApi();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed",
      );
    }
    return rejectWithValue("Logout failed");
  }
});
export const loginProfile = createAsyncThunk<
  LoginResponse,
  LoginProfilePayload,
  { rejectValue: string }
>("profile/login", async (payload, { rejectWithValue }) => {
  try {
    return await loginApi(payload);
  } catch (error) {
    if (axios.isAxiosError(error))
      return rejectWithValue(error.response?.data?.message || "Login failed");
    return rejectWithValue("Login failed");
  }
});

export const registerProfile = createAsyncThunk<
  RegisterResponse,
  RegisterProfilePayload,
  { rejectValue: string }
>("profile/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await registerApi(payload);
    return res;
  } catch (error) {
    if (axios.isAxiosError(error))
      return rejectWithValue(error.response?.data?.message || "Login failed");
    return rejectWithValue("Login failed");
  }
});
