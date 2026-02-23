import React from "react";
import { FiX } from "react-icons/fi";
import { useLoginProfile } from "../../hooks/useLoginProfile";
interface LoginFormProps {
  onClose: () => void;
  onSwitchRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onClose,
  onSwitchRegister,
}) => {
  const { formData, loading, error, handleChange, handleSubmit } =
    useLoginProfile();
  const inputCss =
    "w-full rounded-md border border-pink-300 px-3 py-2 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-400 outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg animate-fadeIn">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Đăng nhập</h1>
          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-pink-500 text-xl"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            const success = await handleSubmit(e);
            if (success) {
              onClose();
            }
          }}
        >
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              placeholder="Nhập email"
              className={inputCss}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
            <input
              onChange={handleChange}
              value={formData.password}
              name="password"
              type="password"
              placeholder="Nhập password"
              className={inputCss}
            />
          </div>
          {error && (
            <p className="text-red-500 text-center my-2 text-sm">{error}</p>
          )}
          <button
            disabled={loading}
            type="submit"
            className="mt-4 w-full rounded-md cursor-pointer bg-pink-500 py-2 font-semibold text-white hover:bg-pink-600"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Switch */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={onSwitchRegister}
            className="text-pink-500 cursor-pointer hover:underline font-medium"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
};
