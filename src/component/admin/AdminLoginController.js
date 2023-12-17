import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";

function AdminLoginController() {
  const [isLogin, setLogin] = useState(true);

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{'width':400}} >
        <div className="card-body">
          {isLogin ? (
            <AdminLogin />
          ) : (
            <AdminSignup />
          )}
          <p className="mt-3 text-center">or</p>
          <button
            type="button"
            className={`btn ${isLogin ? 'btn-outline-primary' : 'btn-outline-secondary'} w-100`}
            onClick={() => setLogin(!isLogin)}
          >
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginController;
