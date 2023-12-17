import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function VendorLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://back-dvsv.onrender.com/auth/vendor/login', {
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
        console.log('Vendor login successful:', data.message);
        // Perform additional actions on successful login, e.g., set vendor session
        navigate('/vendorpage');
      } else {
        setError(data.message || 'Vendor login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during vendor login:', error.message);
      setError('An error occurred during vendor login. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Vendor Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form style={{ width: 400 }} className="mx-auto">
        <div className="mb-3">
          <label htmlFor="vendorEmail" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="vendorEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vendorPassword" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="vendorPassword"
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

export default VendorLogin;
