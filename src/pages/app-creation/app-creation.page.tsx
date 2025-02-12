import React, { useState } from "react";
import styles from "./app-creation.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import InputComponent, {
  InputType,
} from "../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";

const AppCreationPage: React.FC = () => {
  const [appName, setAppName] = useState<string>("");

  const handleOnChange = (name: string): void => {
    setAppName(name);
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link="/" />
      <div className={styles.headerContainer}>
        <h2>Create a new test app</h2>
      </div>
      <p>Provide a unique name for your new test app.</p>
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
          onClick={() => {}}
          disabled={appName.length === 0}
        />
      </div>
    </div>
  );
};

export default AppCreationPage;
