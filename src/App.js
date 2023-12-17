import { useState } from 'react';
import './App.css';
import UserLogin from './component/user/UserLogin';
import VendorLogin from './component/vendor/VendorLogin';
import AdminLogin from './component/admin/AdminLogin';
import UserSignup from './component/user/UserSignup';
import UserLoginController from './component/user/UserloginControler';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from './component/user/UserPage';
import Entry from './Entry';
import AdminPage from './component/admin/AdminPage';



function App() {
  // Use array destructuring to get the state and setter
  const [login, setLogin] = useState("user");

  return (
<BrowserRouter>



    <div className="App">
      
      

      <Routes>
        
        <Route exact path='/' element={<Entry/>} />
        <Route exact path="/userpage" element={<UserPage />}/>
        <Route exact path="/adminpage" element={<AdminPage />}/>
        
        
          
        
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
