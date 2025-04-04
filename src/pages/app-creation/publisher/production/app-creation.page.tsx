import React, { useEffect, useRef, useState } from "react";
import styles from "./app-creation.module.css";
import sharedStyles from "../../../../styles/app-creation-name.module.css";
import NavLinkComponent from "../../../../components/nav-link/nav-link.component";
import TextComponent, {
  TypographyType,
} from "../../../../components/text/typography.component";
import InputComponent, {
  InputType,
} from "../../../../components/input/input.component";
import SearchableDropdownComponent from "../../../../components/searchable-dropdown/searchable-dropdown.component";
import Search from "../../../../assets/search.svg";
import RadioButtonComponent, {
  RadioButtonOption,
} from "../../../../components/radio-button/radio-button.component";
import ButtonComponent, {
  ButtonType,
} from "../../../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axios-instance";
import axios from "axios";
import { ValidationResponse } from "../integration/app-creation.page";
import SpinnerComponent from "../../../../components/spinner/spinner.component";
import Check from '../../../../assets/check.svg';
import classNames from "classnames";
import { Routes as r } from "../../../../constants/routes";

interface TRA {
  name: string;
  swaCode: number;
}

const ProductionAppCreationPage: React.FC = () => {
  const [appName, setAppName] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResponse, setValidationResponse] =
    useState<ValidationResponse>();
  const [displayTras, setDisplayTras] = useState<TRA[]>([]);
  const [selectedTra, setSelectedTra] = useState<TRA>();
  const [publishType, setPublishType] = useState<number>();
  const appNameDebounceTimeout = useRef<number>(null);
  const traDebounceTimeout = useRef<number>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const navigate = useNavigate();

  const options: RadioButtonOption[] = [
    {
      title: "Publishing on behalf of a TRA",
      subtitle: selectedTra
        ? `I confirm I have permission to publish on behalf of ${selectedTra} in line with the terms and conditions`
        : "",
      value: 0,
    },
    {
      title: "I am a self-publishing TRA",
      value: 1,
    },
  ];

  const handleChange = (name: string): void => {
    setAppName(name);
    if (name === "") return;
    setIsValidating(true);

    if (appNameDebounceTimeout.current) {
      clearTimeout(appNameDebounceTimeout.current);
    }

    appNameDebounceTimeout.current = setTimeout(() => {
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

  const handleSearchChange = (value: string): void => {
    if (value === "") return;

    if (traDebounceTimeout.current) {
      clearTimeout(traDebounceTimeout.current);
    }

    traDebounceTimeout.current = setTimeout(() => {
      fetchTRAs(value);
    }, 2000);
  };

  const fetchTRAs = async (value: string) => {
    try {
      const response = await axiosInstance.get(`/tras?traName=${value}`);
      setDisplayTras(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setDisplayTras([]);
      } else {
        console.error("Could not fetch TRAs");
      }
    }
  }

  const handleOnSelect = (value: string) => {
    const tra = displayTras.find(tra => tra.name === value);
    setSelectedTra(tra);
  };

  const handlePublishTypeChange = (value: number): void => {
    setPublishType(value);
  };

  const handleClick = async (): Promise<void> => {
    if (appName === "" || isCreating) return;

    setIsCreating(true);
    const body = {
      name: appName,
      type: "Publish",
      swaCode: selectedTra?.swaCode,
    };
    try {
      const response = await axiosInstance.post("/applications", body);
      navigate(r.Details, { state: { from: "create", appID: response.data.appId } });
    } catch (error) {
      console.error("Error creating application:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link={r.Home} />
      <div className={styles.headerContainer}>
        <TextComponent
          type={TypographyType.SubHeading}
          content="Request a new publisher app"
        />
      </div>
      <TextComponent
        type={TypographyType.SubDescription}
        content="Give your app a name"
      />
      <div className={styles.appNameContainer}>
        <InputComponent
          value={appName}
          type={InputType.Text}
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
          onChange={handleChange}
        />
        <div
          className={classNames(sharedStyles.validationMessageContainer, {
            [sharedStyles.show]: appName !== "" && validationResponse,
            [sharedStyles.valid]: validationResponse?.isValid,
            [sharedStyles.invalid]: !validationResponse?.isValid,
          })}
        >
          <p
            className={classNames(sharedStyles.validation, {
              [sharedStyles.valid]: validationResponse?.isValid,
              [sharedStyles.invalid]: !validationResponse?.isValid,
            })}
          >
            {validationResponse?.message}
          </p>
        </div>
      </div>
      <TextComponent
        type={TypographyType.SubDescription}
        content="Link your app to a TRA"
      />
      <SearchableDropdownComponent
        items={displayTras.map(tra => tra.name)}
        leadingIcon={Search}
        onChange={handleSearchChange}
        onSelect={handleOnSelect}
        placeholderText="Start typing to search for a TRA ..."
      />
      <div className={styles.textContainer}>
        <TextComponent
          type={TypographyType.SubDescription}
          content="Can't find the TRA? Contact cso@dft.gov.uk"
        ></TextComponent>
      </div>
      <TextComponent
        type={TypographyType.SubDescription}
        content="Confirm your relationship with the TRA"
      />
      <TextComponent
        type={TypographyType.SubDescription}
        content="Please confirm you have consent to publish TROs to the D-TRO service in line with the Terms and Conditions. If you are a self-publishing TRA select option 2."
      />
      <RadioButtonComponent
        name="publishType"
        options={options}
        onChange={handlePublishTypeChange}
      />
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type={ButtonType.Primary}
          onClick={handleClick}
          disabled={
            appName === "" || !selectedTra || publishType === undefined
          }
        >
          {isCreating ? <SpinnerComponent colour="rgb(255, 255, 255)" /> : "Create"}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ProductionAppCreationPage;
