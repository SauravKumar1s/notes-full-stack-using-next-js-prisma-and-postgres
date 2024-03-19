"use client";
import React, { useState } from "react";
import { changePassword } from "@/app/action/users/changePassword";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const responseMessage = await changePassword(resetPasswordToken, password);

    setMessage(responseMessage);
    if (responseMessage === "Password changed successfully") {
      router.push("/auth/login");
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Change Password</h1>
        <form className="flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-semibold"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-3 top-6 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
         
          </div>

          <label
            htmlFor="confirmPassword"
            className="text-gray-700 text-sm font-semibold"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible2 ? "text" : "password"}
              id="confirmPassword"
              className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility2}
            >
              {isPasswordVisible2 ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-green-500">
            {message} <Link href="/"> Login </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordForm;
