import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://back-dvsv.onrender.com/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Admin login successful:', data.message);
        
        // Save admin information and token in local storage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));

        // Perform additional actions on successful login, e.g., set admin session
        navigate('/adminpage');
      } else {
        setError(data.message || 'Admin login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during admin login:', error.message);
      setError('An error occurred during admin login. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mx-auto">
        <div className="mb-3">
          <label htmlFor="adminEmail" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="adminEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adminPassword" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="adminPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
