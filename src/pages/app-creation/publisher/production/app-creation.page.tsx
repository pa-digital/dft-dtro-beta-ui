import React, { useEffect, useState } from "react";
import styles from "./app-creation.module.css";
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

const ProductionAppCreationPage: React.FC = () => {
  const [appName, setAppName] = useState<string>("");
  const [tras, setTras] = useState<string[]>([]);
  const [displayTras, setDisplayTras] = useState<string[]>([]);
  const [selectedTra, setSelectedTra] = useState<string>("");
  const [publishType, setPublishType] = useState<number>();

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

  useEffect(() => {
    // Fetch TRAs
    const tras = [
      "Surrey County Council",
      "Suffolk County Council",
      "East Sussex County Council",
      "West Sussex County Council",
    ];
    setTras(tras);
  }, []);

  const handleChange = (value: string): void => {
    setAppName(value);
  };

  const handleSearchChange = (value: string): void => {
    const displayTras = tras.filter((tra) =>
      tra.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayTras(displayTras);
  };

  const handleOnSelect = (value: string) => {
    setSelectedTra(value);
  };

  const handlePublishTypeChange = (value: number): void => {
    setPublishType(value);
  };

  const handleClick = (): void => {
    const payload = {
      appName,
      tra: selectedTra,
      publishType,
    };
    navigate("/success");
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" />
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
      <div className={styles.inputContainer}>
        <InputComponent
          value={appName}
          type={InputType.Text}
          onChange={handleChange}
        />
      </div>
      <TextComponent
        type={TypographyType.SubDescription}
        content="Link your app to a TRA"
      />
      <SearchableDropdownComponent
        items={displayTras}
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
            appName === "" || selectedTra === "" || publishType === undefined
          }
        >
          Submit
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ProductionAppCreationPage;
