"use client";
import React, { useState } from 'react';
import { changePassword } from '@/app/action/users/changePassword';

interface ChangePasswordFormProps {
    resetPasswordToken: string;
}

const ChangePasswordForm = ({ resetPasswordToken }: ChangePasswordFormProps) => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        const responseMessage = await changePassword(resetPasswordToken, password);

        setMessage(responseMessage);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Change Password</h1>
                <form className="flex flex-col gap-4">
                    <label htmlFor="password" className="text-gray-700 text-sm font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-semibold">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="border p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        onClick={handleSubmit}
                    >
                        Change Password
                    </button>
                </form>
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </div>
        </div>
    );
};

export default ChangePasswordForm;
