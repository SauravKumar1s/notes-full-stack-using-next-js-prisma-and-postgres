"use client";

import React, { useState } from "react";
import { resetPassword } from "@/app/action/users/resetPassword";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    const message = await resetPassword(email);
    setMessage(message);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
        <form className="flex flex-col gap-4">
          <label htmlFor="email" className="text-gray-700 text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
