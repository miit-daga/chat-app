// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Signup from "./Login/Signup.jsx";
const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/register" element={<Signup></Signup>}></Route>
      <Route path="*" element={<Login></Login>}></Route>
    </Routes>
  );
};

export default Views;
