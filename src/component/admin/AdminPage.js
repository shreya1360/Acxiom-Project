import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VendorForm from './VendorForm'; // Assuming VendorForm is in the same directory

function AdminDashboard() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [activeContent, setActiveContent] = useState('maintainVendors'); // Default to maintain vendors
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://back-dvsv.onrender.com/auth/get-all-vendors', {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVendors(data.vendors);
        } else {
          setError('Failed to fetch vendors');
        }
      } catch (error) {
        console.error('Error during fetch vendors:', error.message);
        setError('An error occurred during fetch vendors');
      }
    };

    fetchVendors();
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://back-dvsv.onrender.com/auth/get-all-users', {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error during fetch users:', error.message);
        setError('An error occurred during fetch users');
      }
    };

    // Fetch users only when "Maintain Users" is active
    if (activeContent === 'maintainUsers') {
      fetchUsers();
    }
  }, [token, activeContent]);

  const handleMaintainUser = () => {
    setActiveContent('maintainUsers');
  };

  const handleMaintainVendor = () => {
    setActiveContent('maintainVendors');
  };

  const handleAddVendor = () => {
    setShowVendorForm(true);
  };

  const handleAddMembership = () => {
    // Navigate to the Add Membership component or route
    // navigate('/admin/add-membership');
  };

  const handleLogout = () => {
    // Add logic for logging out, e.g., clearing session, redirecting to login page
    console.log('Logout');
    localStorage.clear();
     navigate('/'); // Redirect to the login page
  };

  const handleCloseVendorForm = () => {
    setShowVendorForm(false);
  };

  const handleAddVendorFormSubmit = async (vendorData) => {
    try {
      const response = await fetch('https://back-dvsv.onrender.com/auth/admin/add-vendor', {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: vendorData.name,
          email: vendorData.email,
          password: vendorData.password,
          role: 'vendor',
          category: vendorData.category,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Vendor added successfully:', data.message);
        // Update vendors state or perform any other necessary actions
      } else {
        if (data.error && data.error.includes('Vendor with the provided email already exists')) {
          console.error('Error adding vendor: Vendor with the provided email already exists');
          // Provide feedback to the user, e.g., show an error message
        } else {
          console.error('Error adding vendor:', data.message || 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Error adding vendor:', error.message);
    }

    // Close the form after adding the vendor
    setShowVendorForm(false);

    // Refetch vendors after adding a new one
    const fetchVendors = async () => {
      try {
        const response = await fetch('https://back-dvsv.onrender.com/auth/get-all-vendors', {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVendors(data.vendors);
        } else {
          setError('Failed to fetch vendors');
        }
      } catch (error) {
        console.error('Error during fetch vendors:', error.message);
        setError('An error occurred during fetch vendors');
      }
    };

    fetchVendors();
  };

  const renderUsersContent = () => {
    return (
      <div>
        <h3 className="p-5">Maintain Users</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderVendorsContent = () => {
    return (
      <div>
        <h3 className="p-5">Maintain Vendors</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={handleAddVendor}
          >
            Add Vendor
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddMembership}
          >
            Add Membership
          </button>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.role}</td>
                <td>{vendor.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'maintainUsers':
        return renderUsersContent();
      case 'maintainVendors':
        return renderVendorsContent();
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <br />
              <br />
              <h1 className="mb-4">Admin Dashboard</h1>
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link btn btn-link"
                  onClick={handleMaintainUser}
                >
                  Maintain Users
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link btn btn-link"
                  onClick={handleMaintainVendor}
                >
                  Maintain Vendors
                </button>
              </li>
            </ul>
            <hr className="my-4" />
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            {/* ... (existing code) */}
          </div>
          {renderContent()}
        </main>
      </div>

      {/* Add Vendor Form */}
      <VendorForm
        show={showVendorForm}
        handleClose={handleCloseVendorForm}
        handleAddVendor={handleAddVendorFormSubmit}
      />
    </div>
  );
}

export default AdminDashboard;
