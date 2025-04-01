import React, { useRef, useState } from "react";
import styles from "../../../../styles/app-creation-name.module.css";
import NavLinkComponent from "../../../../components/nav-link/nav-link.component";
import InputComponent, {
  InputType,
} from "../../../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import Check from "../../../../assets/check.svg";
import classNames from "classnames";
import SpinnerComponent from "../../../../components/spinner/spinner.component";
import axiosInstance from "../../../../utils/axios-instance";

export interface ValidationResponse {
  isValid: boolean;
  message: string;
}

const IntegrationAppCreationPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
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
      checkAppNameValid(name);
    }, 2000);
  };

  const checkAppNameValid = async (appName: string) => {
    try {
      const response = await axiosInstance.get(`/applications/validateName?name=${appName}`);
      setValidationResponse(response.data);
    } catch (error) {
      console.error('Error validating app name:', error);
      setValidationResponse({
        isValid: false,
        message: "Error validating app name"
      });
    } finally {
      setIsValidating(false);
    }
  }

  const handleClick = async () => {
    if (appName === "" || isCreating) return;
    setIsCreating(true);

    try {
      const body = {
        name: appName,
        type: "Publish"
      };
      const response = await axiosInstance.post("/applications", body);
      navigate("/details", { state: { from: "create", appID: response.data.appId } });
    } catch (error) {
      console.error("Error creating application:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" />
      <div className={styles.headerContainer}>
        <h2>Create a new test app</h2>
      </div>
      <p>Provide a unique name for your new app.</p>
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
          onClick={handleClick}
          disabled={appName.length === 0 || !validationResponse?.isValid}
        >
          {isCreating ? <SpinnerComponent colour="rgb(255, 255, 255)" /> : "Create"}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default IntegrationAppCreationPage;
