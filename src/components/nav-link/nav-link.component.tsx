import React from "react";
import styles from "./nav-link.module.css";
import BackArrow from "../../assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";

interface NavLinkComponentProps {
  text: string;
}

const NavLinkComponent: React.FC<NavLinkComponentProps> = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.navContent} onClick={() => navigate(-1)}>
      <img src={BackArrow}></img>
      <a>{text}</a>
    </div>
  );
};

export default NavLinkComponent;
