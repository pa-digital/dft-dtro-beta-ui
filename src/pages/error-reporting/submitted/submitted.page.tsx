import React from "react";
import styles from "../../success/success.module.css";
import NavLinkComponent from "../../../components/nav-link/nav-link.component";
import ButtonComponent, {
  ButtonType,
} from "../../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import TextComponent, {
  TypographyType,
} from "../../../components/text/typography.component";

const ErrorReportingSubmittedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link="/home" />
      <div className={styles.headerContainer}>
        <div className={styles.headerContainer}>
          <h2>Your report has been successfully submitted</h2>
        </div>
      </div>
      <TextComponent
        type={TypographyType.SubDescription}
        content="DfT will review your report and contact the relevant data publisher(s) to follow up. DfT may contact you for more information, if required. If you have any further questions please contact dtro-cso@dft.gov.uk."
      />
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type={ButtonType.Primary}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ErrorReportingSubmittedPage;
