"use client"
// components/LoginForm.tsx
import { useState } from 'react';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      console.log(response.data);
      // Handle successful login (e.g., redirect, set session/token)
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
      // Handle login failure (e.g., show error message)
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
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
