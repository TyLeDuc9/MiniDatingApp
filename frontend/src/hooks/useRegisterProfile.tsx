import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import { registerProfile } from "../redux/Profile/profileThunk";
import type { RegisterProfilePayload } from "../types/profileType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useRegisterProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.profile);
  const [formData, setFormData] = useState<RegisterProfilePayload>({
    email: "",
    password: "",
    name: "",
    age: 16,
    gender: "male",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
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
    if (!formData.name.trim()) {
      toast.error("Name không được để trống");
      return;
    }
    if (!formData.bio.trim()) {
      toast.error("Bio không được để trống");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không đúng định dạng");
      return;
    }
    if (formData.age < 16 || formData.age > 100) {
      toast.error("Tuổi phải từ 16 đến 100");
      return;
    }
    try {
      await dispatch(registerProfile(formData)).unwrap();

      toast.success("Đăng ký thành công");

      setFormData({
        email: "",
        password: "",
        name: "",
        age: 16,
        gender: "male",
        bio: "",
      });
      return true;
    } catch (err: unknown) {
      if (typeof err === "string") {
        toast.error(err);
      } else {
        toast.error("Đăng ký thất bại");
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
