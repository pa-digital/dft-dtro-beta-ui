import React, { useEffect, useState } from "react";
import styles from "../success/success.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import { useLocation, useNavigate } from "react-router-dom";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import { Routes as r } from "../../constants/routes";
import axiosInstance from "../../utils/axios-instance";

const AccessPage: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!location.state) {
    //   navigate(r.Home)
    //   return;
    // };

    submitProductionAccessRequest();
  }, []);

  const submitProductionAccessRequest = async () => {
    try {
      await axiosInstance.post("/requestAccess");
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
    }
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link={r.Home} />
      {isSuccess !== undefined && <div className={styles.headerContainer}>
        <div className={styles.headerContainer}>
          {isSuccess ? <h2>Your request has been successfully submitted</h2> : <h2>Could not submit request</h2>}
        </div>
      </div>}
      {isSuccess !== undefined && <>
        <TextComponent
          type={TypographyType.SubDescription}
          content={isSuccess ? "Your request for access to the D-TRO production environment has been submitted. DfT will now review your request and be in contact. You'll receive confirmation to your registered email address once the request has been approved. We've also emailed you to confirm the request has been sent. If you have any questions, please email dtro-cso@dft.gov.uk." : "An error occured when processinf your request. Please try again."}
        />
        <div className={styles.buttonContainer}>
          <ButtonComponent
            type={ButtonType.Primary}
            onClick={() => {
              navigate(r.Home);
            }}
          >
            Home
          </ButtonComponent>
        </div>
      </>}
    </div>
  );
};

export default AccessPage;
