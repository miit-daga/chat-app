// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Register from "./Login/Register.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<text>Welcome Home</text>}></Route>
      </Route>
      <Route path="*" element={<Login></Login>}></Route>
    </Routes>
  );
};

export default Views;
