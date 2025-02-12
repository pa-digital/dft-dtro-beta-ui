import React from "react";
import styles from "./navbar.module.css";
import DfTLogo from "../../assets/dft-logo.svg";

const NavbarComponent: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarTop}></div>
      <div className={styles.navbarContent}>
        <img src={DfTLogo}></img>
      </div>
      <div className={styles.navbarBottom}></div>
    </div>
  );
};

export default NavbarComponent;
