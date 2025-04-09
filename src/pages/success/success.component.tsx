import React from "react";
import styles from "./success.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import { useLocation } from "react-router-dom";
import useAuthNavigate from "../../hooks/use-auth-navigate";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import { Routes as r } from "../../constants/routes";

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useAuthNavigate();

  if (!location.state) return;

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link={r.Home} />
      <div className={styles.headerContainer}>
        <div className={styles.headerContainer}>
          <h2>Your request has been successfully submitted</h2>
        </div>
      </div>
      <TextComponent
        type={TypographyType.SubDescription}
        content="Your request for a new production app has been sent to the DfT. You'll receive confirmation to your registered email address once the request has been approved. We've also emailed you to confirm the request has been sent. If you have any questions, please email dtro-cso@dft.gov.uk"
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
    </div>
  );
};

export default SuccessPage;
