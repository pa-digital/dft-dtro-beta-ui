import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const PublisherLoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const isEmailRegex = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const isPasswordValid = (value: string): boolean => {
    return value !== "";
  };

  const handleEmailChange = (value: string): void => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  const handleClick = (): void => {
    if (!isEmailRegex(email) || !isPasswordValid(password)) {
      return;
    }

    navigate("/auth");
  };

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
        <InputComponent
          value={email}
          type={InputType.Text}
          label="Email address"
          onChange={handleEmailChange}
        />
        <InputComponent
          value={password}
          type={InputType.Password}
          label="Password"
          onChange={handlePasswordChange}
        />
        <div className={styles.buttonContainer}>
          <ButtonComponent
            type={ButtonType.Primary}
            text="Login"
            onClick={handleClick}
            disabled={!isEmailRegex(email) || !isPasswordValid(password)}
          />
        </div>
      </div>
    </div>
  );
};

export default PublisherLoginPage;
