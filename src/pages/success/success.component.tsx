import React from "react";
import styles from "./success.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import TextComponent, { TypographyType } from "../../components/text/typography.component";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link="/" />
      <div className={styles.headerContainer}>
        <TextComponent type={TypographyType.SubHeading} content="Your request has been successfully submitted" />
      </div>
      <TextComponent type={TypographyType.SubDescription} content="As we have now registered your details on the system you may log in once
        you receive approval from the CSO. This may take up to 7 days." />
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
