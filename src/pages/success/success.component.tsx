import React from "react";
import styles from "./success.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link="/" />
      <div className={styles.headerContainer}>
        <h2>Your request has been successfully submitted</h2>
      </div>
      <p>
        As we have now registered your details on the system you may log in once
        you receive approval from the CSO. This may take up to 7 days.
      </p>
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type={ButtonType.Primary}
          text="Close"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default SuccessPage;
