import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./Components/Contact";
import Users from "./Components/Users";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import UsersHome from "./Components/UsersHome";

const App = () => {
  return (
    <main>
      <div>Navigation Bar</div>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Users />}>
            <Route index element={<UsersHome />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/contact-us"
            element={<Navigate replace to="/contact" />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
