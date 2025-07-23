import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPass) {
      alert('Passwords do not match');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-2 border mb-4"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Signup
      </button>
      <p className="mt-4 text-sm">
        Already have an account? <Link to="/login" className="text-green-600">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
