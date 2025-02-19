import React, { useState } from "react";
import styles from "./app-creation.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import InputComponent, {
  InputType,
} from "../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import { useNavigate } from "react-router-dom";

const AppCreationPage: React.FC = () => {
  const [appName, setAppName] = useState<string>("");

  const navigate = useNavigate();

  const handleOnChange = (name: string): void => {
    setAppName(name);
  };

  const handleClick = () => {
    if (appName === "") return;
    // TODO: create the app with Apigee, and return the app ID
    const appID = "9abeda12-a123-4104-9b6a-2bb6a95339ab";
    navigate("/details", { state: { appID } });
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" />
      <div className={styles.headerContainer}>
        <h2>Create a new test app</h2>
        {/* <TextComponent
          type={TypographyType.SubHeading}
          content="Create a new test app"
        /> */}
      </div>
      <p>Provide a unique name for your new test app.</p>
      {/* <TextComponent
        type={TypographyType.SubDescription}
        content="Provide a unique name for your new test app."
      /> */}
      <div className="inputRow">
        <div style={{ width: "720px" }}>
          <InputComponent
            type={InputType.Text}
            value={appName}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div style={{ width: "240px", padding: "24px 0" }}>
        <ButtonComponent
          type={ButtonType.Primary}
          text="Create"
          onClick={handleClick}
          disabled={appName.length === 0}
        />
      </div>
    </div>
  );
};

export default AppCreationPage;
