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
import axiosInstance from "../../utils/axios-instance";
import { isProductionEnv } from "../../utils/env";

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
  const from = location.state?.from;
  const appID = location.state?.appID;

  useEffect(() => {
    fetchAppDetails(appID);
  }, []);

  const fetchAppDetails = async (appID: string): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/applications/${appID}`, {
        headers: {
          "Authorization": "Bearer " // TODO add bearer token from login
        }});
      setAppDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      <NavLinkComponent
        text={from == "create" ? "Home" : "View apps"}
        link={from == "create" ? "/list" : undefined}
      />
      <div className={styles.headerContainer}>
        <h2>{`Your app credentials for ${appDetails?.appName}`}</h2>
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
              label={isProductionEnv() ? "SWA code" : "Test TRA ID"}
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
