import React, { useEffect, useState } from "react";
import styles from "./app-details.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import InputComponent, {
  InputType,
} from "../../components/input/input.component";
import Copy from "../../assets/copy.svg";
import { ToastContainer, toast } from "react-toastify";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import { useLocation } from "react-router-dom";

interface AppDetails {
  appID: string;
  appName: string;
  swaCode: number;
  purpose: string;
  apiKey: string;
  apiSecret: string;
}

const AppDetailsPage: React.FC = () => {
  const [appDetails, setAppDetails] = useState<AppDetails>();
  const [showAPIKey, setShowAPIKey] = useState<boolean>(false);
  const [showAPISecret, setShowAPISecret] = useState<boolean>(false);

  const location = useLocation();
  const appID = location.state?.appID;

  useEffect(() => {
    // TODO: Fetch app details for this app ID
    const appDetails = fetchAppDetails(appID);
    setAppDetails(appDetails);
  }, []);

  const fetchAppDetails = (appID: string) => {
    return {
      appID,
      appName: "INT-Publisher-BenPauley",
      swaCode: 10526,
      purpose: "Testing",
      apiKey: "thisismyapikey",
      apiSecret: "thisismyapisecret",
    };
  };

  const handleAPIKeyIconClick = () => {
    if (!appDetails?.apiKey) return;
    navigator.clipboard.writeText(appDetails.apiKey);
    showToast("Copied to clipboard");
  };

  const handleAPISecretIconClick = () => {
    if (!appDetails?.apiSecret) return;
    navigator.clipboard.writeText(appDetails.apiSecret);
    showToast("Copied to clipboard");
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
      <NavLinkComponent text="Create a new test app" />
      <div className={styles.headerContainer}>
        <h2>{`Your app credentials for ${appDetails?.appName}`}</h2>
        {/* <TextComponent
          type={TypographyType.SubHeading}
          content={`Your app credentials for ${appDetails?.appName}`}
        /> */}
      </div>
      <div className={styles.inputContainer}>
        <div className="inputRow">
          <div style={{ width: "480px" }}>
            <InputComponent
              type={InputType.Text}
              value={appDetails?.appID || ""}
              label="App ID"
              editable={false}
            />
          </div>
          <div style={{ width: "240px" }}>
            <InputComponent
              type={InputType.Text}
              value={appDetails?.swaCode.toString() || ""}
              label="SWA code"
              editable={false}
            />
          </div>
        </div>
        <div className="inputRow">
          <div style={{ width: "560px" }}>
            <InputComponent
              type={InputType.Text}
              value={appDetails?.purpose || ""}
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
              value={appDetails?.apiKey || ""}
              editable={false}
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
              value={appDetails?.apiSecret || ""}
              editable={false}
              trailingIcons={[
                {
                  text: showAPISecret ? "Hide" : "Show",
                  show: true,
                  onClick: () => setShowAPISecret((prev) => !prev),
                },
                { src: Copy, show: true, onClick: handleAPISecretIconClick },
              ]}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppDetailsPage;
