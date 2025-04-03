import React, { useState } from "react";
import styles from "./navigation.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import NavigationItemComponent from "../../components/navigation-item/navigation-item.component";
import { isProductionEnv } from "../../utils/env";

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
        {!isProductionEnv() ? (
          <NavigationItemComponent
            navTitle="Create new publisher test app"
            navSubtitle="Generate publisher app credentials for use with the D-TRO test environment."
            link="/publisher/create"
          />
        ) : (
          <NavigationItemComponent
            navTitle="Create new publisher production app"
            navSubtitle="Generate publisher app credentials for use with the D-TRO production environment."
            link="/publisher/create"
          />
        )}
        {!isProductionEnv() && (
          <NavigationItemComponent
            navTitle="Request new publisher app"
            navSubtitle="Request credentials for a new app to publish to the D-TRO production environment."
            disabled={createProductionAppDisabled}
            link="/publisher-create"
          />
        )}
        <NavigationItemComponent
          navTitle="Create new consumer app"
          navSubtitle="Generate consumer app credentials for use with the D-TRO production environment"
          link="/consumer/create/1"
        />
        <NavigationItemComponent
          navTitle="View credentials"
          navSubtitle="View your existing app credentials and generate new credentials for an existing app."
          link="/list"
        />
      </div>
    </div>
  );
};

export default NavigationPage;
