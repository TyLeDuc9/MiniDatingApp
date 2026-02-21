import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Home } from "../pages/Home/Home";
import { MyAccount } from "../pages/MyAccount/MyAccount";
import { MyMatch } from "../pages/MyMatch/MyMatch";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="my-account" element={<MyAccount />} />
        <Route path="my-match" element={<MyMatch />} />

      </Route>
    </Routes>
  );  
};
