import { Link } from "react-router-dom";

const Navbar = () => {
      return (
        <>
          <Link to="/">home</Link>
          <Link  to="/profile">profile</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      );
  };

export default Navbar;
