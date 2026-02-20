import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-30 py-4 bg-pink-500 text-center">
      <p className="text-sm font-semibold text-white">
        © {new Date().getFullYear()} Mini Dating App Prototype
      </p>
    </footer>
  );
};