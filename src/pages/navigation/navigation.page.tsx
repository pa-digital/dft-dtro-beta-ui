import React, { useState } from "react";
import styles from "./navigation.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import BackArrow from "../../assets/back-arrow.svg";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const NavigationPage: React.FC = () => {
  const [createProductionAppDisabled, setCreateProductionAppDisabled] =
    useState<boolean>(true);

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Sign in" />
      <div className={styles.headerContainer}>
        <h2>Publisher Account</h2>
      </div>
      <div className={styles.navigationContainer}>
        <NavigationItemComponent
          navTitle="Create new test app"
          navSubtitle="Generate app credentials for use with the D-TRO test environment."
          link="/create"
        />
        <NavigationItemComponent
          navTitle="Request new publisher app"
          navSubtitle="Request credentials for a new app to publish to the D-TRO production environment."
          disabled={createProductionAppDisabled}
          link="/"
        />
        <NavigationItemComponent
          navTitle="View credentials"
          navSubtitle="View your existing app credentials for test and production environments and generate new credentials for an existing app."
          link="/list"
        />
      </div>
    </div>
  );
};

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
  link,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={classNames(styles.navigationItemContainer, {
        [styles.disabled]: disabled,
      })}
    >
      <div className={styles.navTitleContainer} onClick={() => navigate(link)}>
        <p className={styles.navTitle}>{navTitle}</p>
        <img src={BackArrow}></img>
      </div>
      <p className={styles.navSubtitle}>{navSubtitle}</p>
    </div>
  );
};

export default NavigationPage;
