"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  // const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        console.log(token)
        document.cookie = `token=${token}; path=/;`;
        setPopupMessage("Login successfully!");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); 
        window.location.href = '/notes';
      
        if (token.token) {
          localStorage.setItem('token', token.token);
          router.push("/notes");

        } else {
          console.error("Token not found in response");
        }
      } else {
        const errorData = await response.json();
        console.error("Login failed:", response.statusText, errorData);
        setPopupMessage("Login Failed");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); 
      }
      
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {showPopup && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 px-4 text-center">
          {popupMessage}
        </div>
      )}
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form>
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border text-black p-2 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        <div className="py-4">
          <Link className="text-blue-500" href="/auth/register">
            Register
          </Link>
        </div>

        <div className="">
          <Link className="text-blue-500" href="/auth/reset-password">
            Forget Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
