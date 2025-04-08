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
import useAuthNavigate from "../../hooks/use-auth-navigate";
import axiosInstance from "../../utils/axios-instance";
import classNames from "classnames";
import SpinnerComponent from "../../components/spinner/spinner.component";
import { Routes as r } from "../../constants/routes";
import { useAuth } from "../../contexts/auth.context";
import { Endpoints } from "../../constants/endpoints";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState<boolean>(false);

  const { isAuthenticated, isLoading } = useAuth();
  const { refreshAuth } = useAuth();

  const navigate = useAuthNavigate();

  const handleUsernameChange = (value: string): void => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  const handleClick = async (): Promise<void> => {
    setIsAuthenticating(true);
    setIsInvalidCredentials(false);
    try {
      await axiosInstance.post(Endpoints.Token.Get, {
        username,
        password,
      });
      await refreshAuth();
      navigate(r.Home);
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
          Enter your app ID and secret to log into the service. If you can't log in or need to request access please email{' '}
          <a href="mailto:dtro-cso@dft.gov.uk">dtro-cso@dft.gov.uk</a>.
        </p>
        <InputComponent
          value={username}
          type={InputType.Text}
          label="Client ID"
          onChange={handleUsernameChange}
        />
        <InputComponent
          value={password}
          type={InputType.Password}
          label="Client secret"
          onChange={handlePasswordChange}
        />
        <p className={classNames(styles.validationMessage, { [styles.show]: isInvalidCredentials })}>Invalid client ID/secret combination</p>
        <div className={styles.buttonContainer}>
          <ButtonComponent
            type={ButtonType.Primary}
            onClick={handleClick}
            disabled={username === "" || password === ""}
          >
            {isAuthenticating ? <SpinnerComponent colour="rgb(255, 255, 255)" /> : "Login"}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
