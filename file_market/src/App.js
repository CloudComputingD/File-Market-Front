import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Components/Sign/Signin";
import Signup from "./Components/Sign/Signup";
import Storage from "./Components/Storage/Storage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="storage" element={<Storage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
