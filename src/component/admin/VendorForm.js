// VendorForm.js
import React, { useState } from 'react';

const VendorForm = ({ show, handleClose, handleAddVendor }) => {
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [vendorCategory, setVendorCategory] = useState('');

  const handleAddClick = () => {
    // Validate form fields if needed

    // Call the parent function to add the vendor
    handleAddVendor({
      name: vendorName,
      email: vendorEmail,
      password: vendorPassword,
      category: vendorCategory,
    });

    // Clear form fields and close the modal
    setVendorName('');
    setVendorEmail('');
    setVendorPassword('');
    setVendorCategory('');
    handleClose();
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Vendor</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="vendorName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="vendorName"
                  placeholder="Enter vendor name"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="vendorEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="vendorEmail"
                  placeholder="Enter vendor email"
                  value={vendorEmail}
                  onChange={(e) => setVendorEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="vendorPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="vendorPassword"
                  placeholder="Enter vendor password"
                  value={vendorPassword}
                  onChange={(e) => setVendorPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="vendorCategory">Category</label>
                <select
                  id="vendorCategory"
                  className="form-select"
                  value={vendorCategory}
                  onChange={(e) => setVendorCategory(e.target.value)}
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Catering">Catering</option>
                  <option value="Florist">Florist</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Lighting">Lighting</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddClick}>
              Add Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
