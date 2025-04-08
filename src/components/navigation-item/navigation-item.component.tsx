import React from "react";
import styles from "./navigation-item.module.css";
import useAuthNavigate from "../../hooks/use-auth-navigate";
import classNames from "classnames";
import BackArrow from "../../assets/back-arrow.svg";

interface NavigationItemComponentProps {
  navTitle: string;
  navSubtitle: string;
  disabled?: boolean;
  link: string;
}

const NavigationItemComponent: React.FC<NavigationItemComponentProps> = ({
  navTitle,
  navSubtitle,
  disabled = false,
  link
}) => {
  const navigate = useAuthNavigate();

  return (
    <div
      className={classNames(styles.navigationItemContainer, {
        [styles.disabled]: disabled,
      })}
    >
      <div className={styles.navTitleContainer} onClick={() => { if (!disabled) navigate(link) }}>
        <p className={styles.navTitle}>{navTitle}</p>
        <img src={BackArrow}></img>
      </div>
      <p className={styles.navSubtitle}>{navSubtitle}</p>
    </div>
  );
};

export default NavigationItemComponent;
