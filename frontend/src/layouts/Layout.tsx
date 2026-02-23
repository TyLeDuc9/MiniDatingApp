
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
