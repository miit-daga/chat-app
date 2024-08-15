import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Register from "./Login/Register.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import { AccountContext } from "./AccountContext.jsx";
import Home from "./Home/Home.jsx";
const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <p>Loading...</p>
  ) : (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<Login></Login>}></Route>
    </Routes>
  );
};

export default Views;
