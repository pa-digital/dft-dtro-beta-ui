import React from "react";
import styles from "./sidebar.module.css";
import Arrow from "../../assets/back-arrow.svg";
import { useNavigate } from "react-router";

const SidebarComponent: React.FC = ({}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>Menu</div>
      <SidebarLinkComponent text="Pending requests" link="/requests" />
      <SidebarLinkComponent text="Users" link="/users" />
      <SidebarLinkComponent text="TROs" link="/tros" />
    </div>
  );
};

export default SidebarComponent;

interface SidebarLinkProps {
  text: string;
  link: string;
}

const SidebarLinkComponent: React.FC<SidebarLinkProps> = ({ text, link }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(link);
  };

  return (
    <div className={styles.linkItem} onClick={onClick}>
      <div className={styles.linkText}>{text}</div>
      <div className={styles.linkNav}>
        <img src={Arrow}></img>
      </div>
    </div>
  );
};
