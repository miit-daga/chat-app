// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Register from "./Login/Register.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import { AccountContext } from "./AccountContext.jsx";
import { Text } from "@chakra-ui/react";
const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <p>Loading...</p>
  ) : (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Text>Welcome Home</Text>}></Route>
      </Route>
      <Route path="*" element={<Login></Login>}></Route>
    </Routes>
  );
};

export default Views;
