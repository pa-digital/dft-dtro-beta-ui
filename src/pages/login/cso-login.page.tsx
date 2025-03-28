import React from "react";
import styles from "./login.module.css";
import Logo from "../../assets/logo.svg";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import InputComponent, {
  InputType,
} from "../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
const CsoLoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img src={Logo}></img>
      </div>
      <div className={styles.something}>
        <TextComponent
          type={TypographyType.MainHeading}
          content="Welcome to the CSO portal"
        />
        <TextComponent
          type={TypographyType.Description}
          content="Enter your details to log in."
        />
        <div className={styles.formContainer}>
          <InputComponent
            value=""
            type={InputType.Text}
            label="Email address"
          />
          <InputComponent value="" type={InputType.Password} label="Password" />
          <div className={styles.logInButton}>
            <ButtonComponent
              type={ButtonType.Primary}
              onClick={() => {}}
            >
              Login
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsoLoginPage;
