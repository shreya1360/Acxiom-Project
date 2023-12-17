import React, { useState } from "react";
import UserLoginController from "./component/user/UserloginControler";
import VendorLogin from "./component/vendor/VendorLogin";
import AdminLogin from "./component/admin/AdminLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLoginController from "./component/admin/AdminLoginController";

function Entry() {
  const [login, setLogin] = useState("user");

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Event Management System</h1>
      <div className="btn-group" role="group">
        <button
          type="button"
          className={`btn ${login === 'user' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setLogin('user')}
        >
          User
        </button>
        <button
          type="button"
          className={`btn ${login === 'vendor' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setLogin('vendor')}
        >
          Vendor
        </button>
        <button
          type="button"
          className={`btn ${login === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setLogin('admin')}
        >
          Admin
        </button>
      </div>

      {/* Use conditional rendering based on the login state */}
      {login === "user" && <UserLoginController />}
      {login === "vendor" && <VendorLogin />}
      {login === "admin" && <AdminLoginController />}
    </div>
  );
}

export default Entry;
