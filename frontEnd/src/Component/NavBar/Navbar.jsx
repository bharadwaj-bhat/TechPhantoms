import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const Navbar = () => {
  const { state, dispatch } = useContext(userContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <Link to="/">home</Link>
          <Link to="/profile">profile</Link>
          <Link to="/logout">Logout</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/">home</Link>
          <Link to="/profile">profile</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      );
    }
  };
  return (
    <div>
      <RenderMenu />
    </div>
  );
};

export default Navbar;
