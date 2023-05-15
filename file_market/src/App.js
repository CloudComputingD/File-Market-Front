import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Components/Sign/Signin";
import Signup from "./Components/Sign/Signup";
import Storage from "./Components/Storage/Storage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Bin from './Components/Bin/Bin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="storage" element={<Storage />} />
        <Route path='dashboard' element={<Dashboard />}/>
        <Route path='bin' element={<Bin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
