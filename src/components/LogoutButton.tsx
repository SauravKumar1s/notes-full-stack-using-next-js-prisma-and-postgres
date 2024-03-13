"use client";
import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.href = '/';
  };

  return (
    <span className="text-md ml-3 font-semibold" onClick={handleLogout}>Logout</span>
  );
};

export default LogoutButton;
