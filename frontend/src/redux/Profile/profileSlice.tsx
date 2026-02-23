import { createSlice } from "@reduxjs/toolkit";
import {
  registerProfile,
  loginProfile,
  logoutProfile,
  getMeProfile,
  getAllProfile
} from "./profileThunk";
import type { Profile } from "../../types/profileType";

interface ProfileState {
  profile: Profile | null;
  profiles: Profile[];
  loading: boolean;
  error: string | null;
}

const savedProfile = localStorage.getItem("profile");
const initialState: ProfileState = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
  profiles: [],
  loading: false,
  error: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })
      .addCase(loginProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("profile", JSON.stringify(action.payload.user));
      })
      .addCase(loginProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(logoutProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
      })
      .addCase(logoutProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload || "Logout failed";
      })
      .addCase(getMeProfile.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        localStorage.setItem("profile", JSON.stringify(action.payload.user));
      })
      .addCase(getMeProfile.rejected, (state) => {
        state.profile = null;
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
      })
      .addCase(getAllProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.profiles ?? action.payload;
      })
      .addCase(getAllProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
