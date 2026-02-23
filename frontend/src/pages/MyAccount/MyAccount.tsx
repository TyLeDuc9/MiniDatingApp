import React, { useEffect } from "react";
import bck from "../../assets/backGround/bck.jpg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getMeProfile } from "../../redux/Profile/profileThunk";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const MyAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (!profile && localStorage.getItem("token")) {
      dispatch(getMeProfile());
    }
  }, [dispatch, profile]);

  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src={bck}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {profile ? (
          <div className="w-full max-w-sm rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
            <h2 className="mb-6 text-center text-2xl font-bold text-white tracking-wide">
              Thông tin tài khoản
            </h2>

            <div className="space-y-4 text-sm text-white">
              <div className="border-b border-white/20 pb-3">
                <p className="text-xs tracking-widest">Email</p>
                <p className="break-all font-medium">{profile.email}</p>
              </div>

              <div className="border-b border-white/20 pb-3">
                <p className="text-xs tracking-widest">Tên</p>
                <p className="font-medium">{profile.name}</p>
              </div>

              <div className="border-b border-white/20 pb-3">
                <p className="text-xs tracking-widest">Tuổi</p>
                <p className="font-medium">{profile.age}</p>
              </div>

              <div className="border-b border-white/20 pb-3">
                <p className="text-xs tracking-widest">Giới tính</p>
                <p className="font-medium capitalize">{profile.gender}</p>
              </div>

              <div>
                <p className="text-xs tracking-widest mb-1">Giới thiệu</p>
                <p className="leading-relaxed text-white/90">
                  {profile.bio || "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white text-lg font-medium">Bạn chưa đăng nhập</p>
        )}
      </div>
    </div>
  );
};
