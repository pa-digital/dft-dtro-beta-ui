import React, { useEffect, useRef, useState } from "react";
import styles from "./app-creation.module.css";
import NavLinkComponent from "../../../components/nav-link/nav-link.component";
import InputComponent, {
  InputType,
} from "../../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import Check from "../../../assets/check.svg";
import classNames from "classnames";
import SpinnerComponent from "../../../components/spinner/spinner.component";

export interface ValidationResponse {
  isValid: boolean;
  message: string;
}

const IntegrationAppCreationPage: React.FC = () => {
  const [appName, setAppName] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResponse, setValidationResponse] =
    useState<ValidationResponse>();
  const debounceTimeout = useRef<number>(null);

  const navigate = useNavigate();

  const handleOnChange = (name: string): void => {
    setAppName(name);
    setValidationResponse(undefined);
    if (name === "") return;
    setIsValidating(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      // TODO: make API call to validate app name
      setIsValidating(false);
      setValidationResponse({
        isValid: name !== "Duplicate App Name",
        message:
          name === "Duplicate App Name"
            ? "App name already in use"
            : "Application name available",
      });
    }, 2000);
  };

  const handleClick = () => {
    if (appName === "") return;
    // TODO: create the app with Apigee, and return the app ID
    const appID = "9abeda12-a123-4104-9b6a-2bb6a95339ab";
    navigate("/details", { state: { from: "create", appID } });
  };

  useEffect(() => {
    console.log(validationResponse);
  }, [validationResponse]);

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" />
      <div className={styles.headerContainer}>
        <h2>Create a new test app</h2>
      </div>
      <p>Provide a unique name for your new test app.</p>
      <div className="inputRow">
        <div style={{ width: "720px" }}>
          <InputComponent
            type={InputType.Text}
            value={appName}
            trailingIcons={[
              {
                show:
                  appName !== "" &&
                  validationResponse?.isValid &&
                  !isValidating,
                src: Check,
              },
              {
                show: appName !== "" && isValidating,
                element: <SpinnerComponent />,
              },
            ]}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div
        className={classNames(styles.validationMessageContainer, {
          [styles.show]: appName !== "" && validationResponse,
          [styles.valid]: validationResponse?.isValid,
          [styles.invalid]: !validationResponse?.isValid,
        })}
      >
        <p
          className={classNames(styles.validation, {
            [styles.valid]: validationResponse?.isValid,
            [styles.invalid]: !validationResponse?.isValid,
          })}
        >
          {validationResponse?.message}
        </p>
      </div>
      <div style={{ width: "240px", padding: "24px 0" }}>
        <ButtonComponent
          type={ButtonType.Primary}
          text="Create"
          onClick={handleClick}
          disabled={appName.length === 0 || !validationResponse?.isValid}
        />
      </div>
    </div>
  );
};

export default IntegrationAppCreationPage;
