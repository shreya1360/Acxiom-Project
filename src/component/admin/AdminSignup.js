import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('https://back-dvsv.onrender.com/auth/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: 'admin',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Admin signup successful:', data.message);

        // Set success message
        setSuccessMessage('Admin account created successfully. Now you can login.');

        // Optionally, you can redirect to the login page
        // navigate('/adminlogin');
      } else {
        setError(data.message || 'Admin signup failed. Please check your information and try again.');
      }
    } catch (error) {
      console.error('Error during admin signup:', error.message);
      setError('An error occurred during admin signup. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Signup</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mx-auto">
        <div className="mb-3">
          <label htmlFor="adminName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="adminName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type="button" className="btn btn-primary" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default AdminSignup;
