import React from "react";
import styles from "./nav-link.module.css";
import BackArrow from "../../assets/back-arrow.svg";

interface NavLinkComponentProps {
  text: string;
  link: string;
}

const NavLinkComponent: React.FC<NavLinkComponentProps> = ({ text, link }) => {
  return (
    <div className={styles.navContent}>
      <img src={BackArrow}></img>
      <a href={link}>{text}</a>
    </div>
  );
};

export default NavLinkComponent;
