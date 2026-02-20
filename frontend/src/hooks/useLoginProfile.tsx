import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import {loginProfile } from "../redux/Profile/profileThunk";
import type {LoginProfilePayload } from "../types/profileType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useLoginProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.profile);
  const [formData, setFormData] = useState<LoginProfilePayload>({
    email: "",
    password: "",

  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("Email không được để trống");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password không được để trống");
      return;
    }
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không đúng định dạng");
      return;
    }
   
    try {
      await dispatch(loginProfile(formData)).unwrap();

      toast.success("Đăng nhập thành công");

      setFormData({
        email: "",
        password: "",
      });
      return true;
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else {
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
