import React from "react";
import styles from "./login.module.css";
import Logo from "../../assets/logo.svg";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component"
import InputComponent, {
  InputType,
} from "../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
const ConsumerLoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={Logo}></img>
      </div>
      <div className={styles.loginContent}>
        <TextComponent
          type={TypographyType.MainHeading}
          content="Welcome to the DTRO service"
        />
        <div className={styles.inlineText}>
          <TextComponent
            type={TypographyType.Description}
            content="Enter your login details. If you can't log in or need to request access please email: "
          />
          <TextComponent
            type={TypographyType.Email}
            content="dtro-cso@dft.gov.uk"
          />
        </div>
        <div className={styles.formContainer}>
          <InputComponent
            value=""
            type={InputType.Text}
            label="Organisation name"
          />
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

export default ConsumerLoginPage;
