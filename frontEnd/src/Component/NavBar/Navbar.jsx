import { useContext, useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import styled from "styled-components";
import { userContext } from "../../App";
import styles from "./Navbar.module.css";
import { cardBgColor } from "../Colors/colors";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GetData } from "../../Utils/LocalStorageData";
import { GetLoggedData } from "../../Redux/action";
// import "./Navbar.css";

function Navbar() {
  const history = useHistory()
  const dispatch = useDispatch()
  // const { state } = useContext(userContext);
  // console.log("state:", state);
const [state,setState] = useState(false)
  const { loggedData } = useSelector(
    (state) => state.homeReducer,
    shallowEqual
  );
const temp = loggedData._id
  // useEffect(()=>{
  //   setState()
  // },[])

  const handleLogout = (e)=>{
    history.push("/login")
  }

  return (
    <div className={styles.Navbody}>
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
            
            <Link to={(temp?"/profile":"/login")} className={styles.links}>
              Dashboard
            </Link>
        
          </Hover>
          <Hover>
            <Link to="#" className={styles.links}>
              Learn
            </Link>
          </Hover>
          <Hover>
            <Link to="#" className={styles.links}>
              Guides
            </Link>
          </Hover>
          <Hover>
            {temp ? (
              <form >
              <button 
               className={styles.buttonlink}
               style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    textDecoration: "none",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "white",
                  }} type="submit" onClick={(e)=>handleLogout(e)}>logout</button>
              </form>
            ) : (
              <button className={styles.buttonlink}>
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
        style={{
          height: "70px",
          width: "100%",
          zIndex: "1",
          marginTop: "-2px",
        }}
      >
        <polygon
          points="-300,0 1400,-30 1700,20"
          style={{ fill:{cardBgColor}, stroke: "none", strokeWidth: "1" }}
        />
      </svg>
    </div>
  );
}

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
  &:hover {
    Link {
      background-color: white;
      display: none;
    }
  }
`;
