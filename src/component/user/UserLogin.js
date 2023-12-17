import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserLogin() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://back-dvsv.onrender.com/auth/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userId,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data.user);

        // Save user information and token to local storage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to user page or any other route
        navigate('/userpage');
      } else {
        setError(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('An error occurred during login. Please try again later.');
    }
  };

  const handleCancel = () => {
    // Implement your cancel logic here
    console.log('Login canceled');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mx-auto">
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
