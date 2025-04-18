import React, { useState } from "react";
import styles from "./navigation-item.module.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import BackArrow from "../../assets/back-arrow.svg";

interface NavigationItemComponentProps {
  navTitle: string;
  navSubtitle: string;
  disabled?: boolean;
  link: string;
  onClick?: () => void;
}

const NavigationItemComponent: React.FC<NavigationItemComponentProps> = ({
  navTitle,
  navSubtitle,
  disabled = false,
  link,
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;

    if (onClick) {
      onClick();
    } else {
      navigate(link);
    }
  }

  return (
    <div
      className={classNames(styles.navigationItemContainer, {
        [styles.disabled]: disabled,
      })}
    >
      <div className={styles.navTitleContainer} onClick={handleClick}>
        <p className={styles.navTitle}>{navTitle}</p>
        <img src={BackArrow}></img>
      </div>
      <p className={styles.navSubtitle}>{navSubtitle}</p>
    </div>
  );
};

export default NavigationItemComponent;
