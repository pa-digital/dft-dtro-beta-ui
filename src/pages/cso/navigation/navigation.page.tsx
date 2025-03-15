import React from "react";
import styles from "./navigation.module.css";
import NavigationItemComponent from "../../../components/navigation-item/navigation-item.component";

const CSONavigationPage: React.FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.headerContainer}>
        <h2>CSO portal actions</h2>
      </div>
      <div className={styles.navigationContainer}>
        <NavigationItemComponent
          navTitle="Pending requests"
          navSubtitle="View and approve pending requests."
          link="/requests"
        />
        <NavigationItemComponent
          navTitle="View and manage active users"
          navSubtitle="View and manage user accounts."
          link="/users"
        />
        <NavigationItemComponent
          navTitle="View TRAs and TROs"
          navSubtitle="View your existing TROs and search them by filtering them down."
          link="/"
        />
      </div>
    </div>
  );
};

export default CSONavigationPage;
