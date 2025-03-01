import React from "react";
import { Link, Outlet } from "react-router-dom";

const Users = () => {
  return (
    <div>
      Users Page Styles
      <div>
        <Link to="login">Login</Link>
        <Link to="signup">Signup</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Users;
