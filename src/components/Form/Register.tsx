"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordRequirement = {
  regex: RegExp;
  message: string;
  valid: boolean;
};

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState<
    PasswordRequirement[]
  >([]);

  const router = useRouter();

  const handleSignUp = async () => {
    const allRequirementsMet = passwordRequirements.every(
      (requirement) => requirement.valid
    );
    if (!allRequirementsMet) {
      console.error("Password does not meet the strength requirements.");
      setPopupMessage("Password does not meet the strength requirements.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);
        setPopupMessage("User created successfully!");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        router.push("/");
      } else {
        console.error("Failed to create user:", response.statusText);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validatePasswordStrength = (
    password: string
  ): PasswordRequirement[] => {
    const requirements: PasswordRequirement[] = [
      { regex: /.{8,}/, message: "At least 8 characters long", valid: false },
      { regex: /[A-Z]/, message: "Contains an uppercase letter", valid: false },
      { regex: /[a-z]/, message: "Contains a lowercase letter", valid: false },
      { regex: /[0-9]/, message: "Contains a number", valid: false },
      {
        regex: /[^A-Za-z0-9]/,
        message: "Contains a special character",
        valid: false,
      },
    ];

    requirements.forEach((requirement) => {
      if (requirement.regex.test(password)) {
        requirement.valid = true;
      }
    });

    return requirements;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 px-4 text-center">
          {popupMessage}
        </div>
      )}
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border text-black p-2 w-full rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border text-black p-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              className="border text-black p-2 w-full rounded "
              value={password}
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);
                setPasswordRequirements(validatePasswordStrength(newPassword));
              }}
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center top-8 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="mb-2">
            {passwordRequirements.map((requirement, index) => (
              <div
                key={index}
                className={`text-sm ${
                  requirement.valid ? "text-green-500" : "text-red-500"
                }`}
              >
                {requirement.message}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <div className="py-6">
            <Link className="text-blue-500" href="/auth/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
