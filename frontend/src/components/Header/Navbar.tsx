import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { headerNavbar } from "../../config/headerNavbar";
import { LoginForm } from "../Form/LoginForm";
import { RegisterForm } from "../Form/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { logoutProfile } from "../../redux/Profile/profileThunk";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
export const Navbar = () => {
  const [activeForm, setActiveForm] = useState<"login" | "register" | null>(
    null,
  );
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profile);

  const handleLogout = () => {
    dispatch(logoutProfile());
    navigate("/")
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav
        className={`flex items-center justify-between px-6 py-6     ${
          scrolled ? "bg-white/80 text-black backdrop-blur w-full tems-center justify-center shadow-md" : "bg-transparent text-white"
        }
`}
      >
        <ul className="flex gap-6 items-center">
          {headerNavbar.map((item) => {
            if (!profile && item.link === "/my-match") {
              return null;
            }
            if (
              profile &&
              (item.action === "login" || item.action === "register")
            ) {
              return null;
            }

            return (
              <li key={item.id}>
                {item.link ? (
                  <Link
                    to={item.link}
                    className=" font-medium hover:text-pink-400"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={() =>
                      setActiveForm(item.action as "login" | "register")
                    }
                    className=" cursor-pointer font-medium hover:text-pink-400"
                  >
                    {item.name}
                  </button>
                )}
              </li>
            );
          })}
          {profile && (
            <li className="flex items-center gap-1 ">
              <div
                onClick={() => navigate("/my-account")}
                className="flex items-center justify-center gap-1 hover:text-pink-400"
              >
                <FaUserCircle size={20} className="cursor-pointer" />
                <span className=" cursor-pointer  font-medium mr-4">
                  {profile.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className=" cursor-pointer hover:text-pink-400 font-medium"
              >
                Đăng xuất
              </button>
            </li>
          )}
        </ul>
      </nav>

      {activeForm === "login" && !profile && (
        <LoginForm
          onClose={() => setActiveForm(null)}
          onSwitchRegister={() => setActiveForm("register")}
        />
      )}

      {activeForm === "register" && !profile && (
        <RegisterForm
          onClose={() => setActiveForm(null)}
          onSwitchLogin={() => setActiveForm("login")}
        />
      )}
    </>
  );
};
