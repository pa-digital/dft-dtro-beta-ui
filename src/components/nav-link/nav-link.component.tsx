import React from "react";
import styles from "./nav-link.module.css";
import BackArrow from "../../assets/back-arrow.svg";
import useAuthNavigate from "../../hooks/use-auth-navigate";

interface NavLinkComponentProps {
  text: string;
  link?: string;
}

const NavLinkComponent: React.FC<NavLinkComponentProps> = ({ text, link }) => {
  const navigate = useAuthNavigate();

  return (
    <div
      className={styles.navContent}
      onClick={() => (link ? navigate(link) : navigate("-1"))}
    >
      <img src={BackArrow}></img>
      <a>{text}</a>
    </div>
  );
};

export default NavLinkComponent;
