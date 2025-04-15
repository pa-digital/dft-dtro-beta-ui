import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import sharedStyles from "../../styles/shared.module.css";
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
import axiosInstance from "../../utils/axios-instance";
import classNames from "classnames";
import SpinnerComponent from "../../components/spinner/spinner.component";
import { Routes as r } from "../../constants/routes";
import { useAuth } from "../../contexts/auth.context";
import { Endpoints } from "../../constants/endpoints";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState<boolean>(false);

  const { isAuthenticated, isLoading } = useAuth();

  const navigate = useNavigate();

  const handleUsernameChange = (value: string): void => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  const isEmailRegex = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const isPasswordValid = (value: string): boolean => {
    return value !== "";
  };

  const handleClick = async (): Promise<void> => {
    if (!isEmailRegex(username) || !isPasswordValid(password)) return;

    setIsAuthenticating(true);
    setIsInvalidCredentials(false);
    try {
      const response = await axiosInstance.post(Endpoints.Authenticate, {
        username,
        password,
      });
      navigate(r.Auth, { state: { token: response.data.token } });
    } catch (error) {
      setIsInvalidCredentials(true);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(r.Home);
    }
  }, [isAuthenticated, isLoading, navigate]);

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
        <p className={sharedStyles.contactContainer}>
          Enter your email and password to log into the service. If you can't log in or need to request access please email{' '}
          <a href="mailto:dtro-cso@dft.gov.uk">dtro-cso@dft.gov.uk</a>.
        </p>
        <InputComponent
          value={username}
          type={InputType.Text}
          label="Email"
          onChange={handleUsernameChange}
        />
        <InputComponent
          value={password}
          type={InputType.Password}
          label="Password"
          onChange={handlePasswordChange}
        />
        <p className={classNames(styles.validationMessage, { [styles.show]: isInvalidCredentials })}>Invalid username/password combination</p>
        <div className={styles.buttonContainer}>
          <ButtonComponent
            type={ButtonType.Primary}
            onClick={handleClick}
            disabled={!isEmailRegex(username) || !isPasswordValid(password)}
          >
            {isAuthenticating ? <SpinnerComponent colour="rgb(255, 255, 255)" /> : "Login"}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
