import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.email === email && storedUser?.password === password) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/home');
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Login
      </button>
      <p className="mt-4 text-sm">
        Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
