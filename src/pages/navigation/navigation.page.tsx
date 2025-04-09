import React, { useEffect, useState } from "react";
import styles from "./navigation.module.css";
import NavigationItemComponent from "../../components/navigation-item/navigation-item.component";
import { isProductionEnv } from "../../utils/env";
import { Routes as r } from "../../constants/routes";
import axiosInstance from "../../utils/axios-instance";

const NavigationPage: React.FC = () => {
  const [canRequestProductionAccess, setCanRequestProductionAccess] =
    useState<boolean>(false);

  useEffect(() => {
    fetchProductionAccessRequestStatus();
  }, []);

  const fetchProductionAccessRequestStatus = async () => {
    try {
      const response = await axiosInstance.get("/canRequestProductionAccess", {});
      setCanRequestProductionAccess(response.data);
    } catch (error) {
      console.error("Could not determine production access status");
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.headerContainer}>
        <h2>Publisher Account</h2>
      </div>
      <div className={styles.navigationContainer}>
        {!isProductionEnv() ? (
          <NavigationItemComponent
            navTitle="Create new publisher test app"
            navSubtitle="Generate publisher app credentials for use with the D-TRO test environment."
            link={r.Publisher.Create}
          />
        ) : (
          <NavigationItemComponent
            navTitle="Create new publisher production app"
            navSubtitle="Generate publisher app credentials for use with the D-TRO production environment."
            link={r.Publisher.Create}
          />
        )}
        {!isProductionEnv() && (
          <NavigationItemComponent
            navTitle="Request production access"
            navSubtitle="Request access to the D-TRO production environment."
            disabled={!canRequestProductionAccess}
            link={r.Access}
          />
        )}
        <NavigationItemComponent
          navTitle="Create new consumer app"
          navSubtitle="Generate consumer app credentials for use with the D-TRO production environment"
          link={r.Consumer.Create.One}
        />
        <NavigationItemComponent
          navTitle="View credentials"
          navSubtitle="View your existing app credentials and generate new credentials for an existing app."
          link={r.Apps}
        />
      </div>
    </div>
  );
};

export default NavigationPage;
