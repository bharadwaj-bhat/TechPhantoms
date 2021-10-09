import { Link } from "react-router-dom";
<<<<<<< HEAD

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
=======
import styled from "styled-components";
import { userContext } from "../../App";

import "./Navbar.css";

function Navbar() {
  const { state } = useContext(userContext);

  return (
    <div className="Navbody">
      <Navbars>
        <Link to="/">
          <img height="40px" src="" alt="LOGO" />
        </Link>

        <div
          style={{
            width: "400px",
            justifyContent: "space-between",
            display: "flex",
            minWidth: "400px",
            paddingTop: "10px",
          }}
        >
          <Hover>
            <Link to="/profile" className="links">
              Dashboard
            </Link>
          </Hover>
          <Hover>
            <Link to="#" className="links">
              Learn
            </Link>
          </Hover>
          <Hover>
            <Link to="#" className="links">
              Guides
            </Link>
          </Hover>
          <Hover>
            {state ? (
              <button
                style={{
                  borderRadius: "30px",
                  width: "100px",
                  border: "none",
                  backgroundColor: "rgb(192,45,40)",
                  marginTop: "-9px",
                  height: "40px",
                  paddingTop: "5px",
                  cursor: "pointer",
                }}
              >
                <Link
                  to="/logout"
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    textDecoration: "none",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "white",
                  }}
                >
                  Logout
                </Link>
              </button>
            ) : (
              <button
                style={{
                  borderRadius: "30px",
                  width: "100px",
                  border: "none",
                  backgroundColor: "rgb(192,45,40)",
                  marginTop: "-9px",
                  height: "40px",
                  paddingTop: "5px",
                  cursor: "pointer",
                }}
              >
                <Link
                  to="/login"
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    textDecoration: "none",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "white",
                  }}
                >
                  Login
                </Link>
              </button>
            )}
          </Hover>
        </div>
      </Navbars>
      <svg
        style={{ height: "70", width: "100%", zIndex: "1", marginTop: "7px" }}
      >
        <polygon
          points="-300,0 1400,-30 1700,20"
          style={{ fill: "#e91d1d", stroke: "none", strokeWidth: "1" }}
        />
      </svg>
    </div>
  );
}
>>>>>>> 69158c0b84cd6ca031bbdc4f86d6ca718c79d982

export default Navbar;

export const Navbars = styled.div`
  width: 85%;
  display: flex;
  font-family: "Open Sans", sans-serif;
  flex-wrap: wrap;
  margin: auto;
  padding: 15px;
  justify-content: space-between;
`;
export const Hover = styled.div`
  color: white;
  text-decoration: none;
  &::hover {
    Link {
      background-color: white;
      display: none;
    }
  }
`;
