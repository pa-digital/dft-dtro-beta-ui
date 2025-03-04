import React, { useEffect, useState } from "react";
import styles from "./app-credentials.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import InputComponent, {
  InputType,
} from "../../components/input/input.component";
import Copy from "../../assets/copy.svg";
import { ToastContainer, toast } from "react-toastify";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";

interface AppCredentialsPageProps {
  appID: string;
}

interface AppCredentials {
  appID: string;
  appName: string;
  swaCode: number;
  purpose: string;
  apiKey: string;
  apiSecret: string;
}

const AppCredentialsPage: React.FC<AppCredentialsPageProps> = ({ appID }) => {
  const [appCredentials, setAppCredentials] = useState<AppCredentials>();
  const [showAPIKey, setShowAPIKey] = useState<boolean>(true);
  const [showAPISecret, setShowAPISecret] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const appCredentials = {
      appID: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      appName: "Integration test 3",
      swaCode: "ABCD1234",
      purpose: "Publish",
      apiKey: "12345abcde67890fghij09876klmnop",
      apiSecret: "thisismyapisecret",
    };
    setAppCredentials(appCredentials);
  }, []);

  const handleAPIKeyIconClick = () => {
    if (!appCredentials?.apiKey) return;
    navigator.clipboard.writeText(appCredentials.apiKey);
    showToast("Copied to clipboard");
  };

  const handleAPISecretIconClick = () => {
    if (!appCredentials?.apiSecret) return;
    navigator.clipboard.writeText(appCredentials.apiSecret);
    showToast("Copied to clipboard");
  };

  const handleGenerateNewCredentialsButtonClick = () => {
    setIsButtonDisabled(true);
  };

  const showToast = (text: string) => {
    toast(text, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "light",
      hideProgressBar: true,
    });
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="All app credentials" link="/" />
      <div className={styles.headerContainer}>
        <TextComponent
          type={TypographyType.SubHeading}
          content={`App credentials for ${appCredentials?.appName}`}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className="inputRow">
          <div style={{ width: "480px" }}>
            <InputComponent
              type={InputType.Text}
              value={appCredentials?.appID || ""}
              label="AP ID"
              editable={false}
            />
          </div>
          <div style={{ width: "240px" }}>
            <InputComponent
              type={InputType.Text}
              value={appCredentials?.swaCode.toString() || ""}
              label="SWA code"
              editable={false}
            />
          </div>
        </div>
        <div className="inputRow">
          <div style={{ width: "560px" }}>
            <InputComponent
              type={InputType.Text}
              value={appCredentials?.purpose || ""}
              label="Purpose"
              editable={false}
            />
          </div>
        </div>
        <TextComponent type={TypographyType.Label} content="API key" />
        <div className="inputRow">
          <div style={{ width: "560px" }}>
            <InputComponent
              type={showAPIKey ? InputType.Text : InputType.Password}
              value={appCredentials?.apiKey || ""}
              editable={true}
              trailingIcons={[
                {
                  text: showAPIKey ? "Hide" : "Show",
                  show: true,
                  onClick: () => setShowAPIKey((prev) => !prev),
                },
                { src: Copy, show: true, onClick: handleAPIKeyIconClick },
              ]}
            />
          </div>
        </div>
        <TextComponent type={TypographyType.Label} content="API secret" />
        <div className="inputRow">
          <div style={{ width: "560px" }}>
            <InputComponent
              type={showAPISecret ? InputType.Text : InputType.Password}
              value={appCredentials?.apiSecret || ""}
              editable={true}
              trailingIcons={[
                {
                  text: showAPISecret ? "Hide" : "Show",
                  onClick: () => setShowAPISecret((prev) => !prev),
                },
                { src: Copy, onClick: handleAPISecretIconClick },
              ]}
            />
          </div>
        </div>
        <div className="inputRow">
          <div style={{ width: "240px" }}>
            <ButtonComponent
              type={ButtonType.Primary}
              text="Generate new credentials"
              onClick={handleGenerateNewCredentialsButtonClick}
              disabled={isButtonDisabled}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppCredentialsPage;
