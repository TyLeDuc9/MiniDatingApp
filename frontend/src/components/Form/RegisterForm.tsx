
import { FiX } from "react-icons/fi";
import { useRegisterProfile } from "../../hooks/useRegisterProfile";
interface RegisterFormProps {
  onClose: () => void;
  onSwitchLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onClose,
  onSwitchLogin,
}) => {
  const inputCss =
    "w-full rounded-md border border-pink-300 px-3 py-2 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-400 outline-none";
  const { formData, loading, error, handleChange, handleSubmit } =
    useRegisterProfile();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg animate-fadeIn">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Đăng ký tài khoản và thông tin
          </h1>
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
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              onChange={handleChange}
              value={formData.password}
              name="password"
              type="password"
              placeholder="Nhập password"
              className={inputCss}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Tên</label>
            <input
              onChange={handleChange}
              value={formData.name}
              name="name"
              type="text"
              placeholder="Nhập tên"
              className={inputCss}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Tuổi</label>
            <input
              onChange={handleChange}
              value={formData.age}
              name="age"
              type="number"
              min={16}
              placeholder="16+"
              className={inputCss}
            />
            <span className="text-sm text-gray-400">
              Tuổi phải từ 16 trở lên
            </span>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Giới tính</label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Nam
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Nữ
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                />
                Khác
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Mô tả</label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Mô tả ngắn về bạn"
              className={inputCss}
            />
          </div>
          {error && (
            <p className="text-red-500 text-center my-2 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            
            className="mt-4 w-full cursor-pointer rounded-md bg-pink-500 py-2 font-semibold text-white transition hover:bg-pink-600"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        {/* Switch */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={onSwitchLogin}
            className="font-medium cursor-pointer text-pink-500 hover:underline"
          >
            Đăng nhập
          </button>
        </p>
      </div>
 
    </div>
  );
};
