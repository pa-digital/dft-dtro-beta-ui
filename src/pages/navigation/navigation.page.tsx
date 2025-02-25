import React, { useState } from "react";
import styles from "./navigation.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import NavigationItemComponent from "../../components/navigation-item/navigation-item.component";

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

export default NavigationPage;
