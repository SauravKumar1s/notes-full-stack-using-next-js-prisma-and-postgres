"use client"

import { useState } from 'react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      console.log(response.data);
      // Handle successful registration (e.g., redirect, set session/token)
    } catch (error) {
      console.error('Registration failed', error.response?.data || error.message);
      // Handle registration failure (e.g., show error message)
    }
  };

  return (
    <form>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;