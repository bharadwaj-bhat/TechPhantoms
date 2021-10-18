import React from "react";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footerbody}>
      <div className={styles.footerlink}>
        <div>
          {/* <Link to="/">
            <img
              height="40px"
              src="https://static.frontendmasters.com/assets/fm/js/frontendmasters.e1e10b58c1.svg"
              alt="LOGO"
            />
          </Link> */}
        </div>
      </div>

      <div className={styles.social}>
        <AiFillTwitterCircle /> &nbsp;
        <AiFillLinkedin /> &nbsp;
        <AiFillInstagram />
        &nbsp;
        <AiFillFacebook />
      </div>

      <p> © 2021 XYZ Masters · Terms of Service · Privacy Policy </p>
    </div>
    //   </div>
  );
}

export { Footer };
