import React, { useState } from "react";
import styles from "./navigation.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import NavigationItemComponent from "../../components/navigation-item/navigation-item.component";
import { isProductionEnv } from "../../utils/env";
import { ButtonType } from "../../components/button/button.component";
import ModalComponent from "../../components/modal/modal.component";
import { useNavigate } from "react-router-dom";

const NavigationPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [createProductionAppDisabled, setCreateProductionAppDisabled] =
    useState<boolean>(true);

  const navigate = useNavigate();

    const handleConfirmNavigation = () => {
      setShowModal(false);
      navigate("/error-report/1");
    };

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
            link="/create"
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
        <NavigationItemComponent
          navTitle="Report a data error"
          navSubtitle="Notify us of an error or anamoly in data published to D-TRO."
          link="/error-report/1"
          onClick={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <div className={styles.modalContainer}>
          <ModalComponent
            title="Report an error"
            subtitle="This service is for reporting specific errors with D-TRO data. If you have technical questions about the service or data specification, please contact dtro-cso@dft.gov.uk. Do you want to continue?"
            buttonText="Confirm"
            buttonType={ButtonType.Primary}
            onClick={handleConfirmNavigation}
            cancelOnClick={() => setShowModal(false)}
          />
        </div>
      )}
      {showModal && <div className={styles.overlay}></div>}
    </div>
  );
};

export default NavigationPage;
