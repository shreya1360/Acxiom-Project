import React, { useState } from "react";

function UserPage(){
    const [selectedVendorOption, setSelectedVendorOption] = useState(null);

    const handleVendorOptionChange = (option) => {
      setSelectedVendorOption(option);
    };
  
    const handleLogout = () => {
      // Implement logout logic here
      console.log('Logging out...');
    };
  
    return (
      <div>
       <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid pt-5">
    <a class="navbar-brand" href="#">Event Management System</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><button type="button" class="btn btn-primary">Cart</button></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#"><button type="button" class="btn btn-primary">Guest List</button></a>
        </li>

        <li class="nav-item">
          <a class="nav-link active" href="#"><button type="button" class="btn btn-primary">Order Status</button></a>
        </li>
        

        <li class="nav-item dropdown">
          <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <button type="button" class="btn btn-primary">Vendor</button>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Catering</a></li>
            <li><a class="dropdown-item" href="#">Florist</a></li>
            <li><a class="dropdown-item" href="#">Florist</a></li>
          
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#"><button type="button" class="btn btn-primary">Log Out</button></a>
        </li>
     
      </ul>
    
    </div>
  </div>
</nav>
      </div>
    );
}
 export default UserPage ;