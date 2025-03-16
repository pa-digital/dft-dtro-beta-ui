import React, { useEffect, useState } from "react";
import styles from "./consumer-app-creation.module.css";
import NavLinkComponent from "../../../components/nav-link/nav-link.component";
import RadioButtonComponent from "../../../components/radio-button/radio-button.component";

const ConsumerAppCreationPage: React.FC = () => {
  const [usage, setUsage] = useState<number>();
  const [usageOtherDetails, setUsageOtherDetails] = useState<string>();
  const [usageMoreInformation, setUsageMoreInformation] = useState<string>();

  const [activity, setActivity] = useState<number>();
  const [activityOtherDetails, setActivityOtherDetails] = useState<string>();

  const usageOptions = [
    {
      title: "Research",
      value: 0,
    },
    {
      title: "Analysis",
      value: 1,
    },
    {
      title: "Product Development",
      value: 2,
    },
    {
      title: "Other",
      value: 3,
    },
  ];

  const activityOptions = [
    {
      title: "Public Sector",
      value: 0,
    },
    {
      title: "Commercial",
      value: 1,
    },
    {
      title: "Non-profit",
      value: 2,
    },
    {
      title: "Other",
      value: 3,
    },
  ];

  const handleUsageChange = (value: number): void => {
    setUsage(value);
  };

  const handleActivityChange = (value: number): void => {
    setActivity(value);
  };

  const usageIsOther = () => {
    return usage === usageOptions.find((v) => v.title === "Other")?.value;
  };

  const activityIsOther = () => {
    return activity === activityOptions.find((v) => v.title === "Other")?.value;
  };

  const handleUsageOtherDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUsageOtherDetails(event.target.value);
  };

  const handleActivityOtherDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setActivityOtherDetails(event.target.value);
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Back" />
      <div className={styles.headerContainer}>
        <h2>About your organization</h2>
      </div>
      <p>
        Please take a few moments to tell us about your interest in D-TRO data.
        This will help us to improve the service and give you relevant
        information in the future. Your answers are confidential and will not be
        used to assess your request for a D-TRO account.
      </p>
      <h3>What do you want to use this account for?</h3>
      <RadioButtonComponent
        name="usage"
        options={usageOptions}
        onChange={handleUsageChange}
      />
      {usageIsOther() && (
        <div className={styles.wrapper}>
          <div className={styles.indicator}></div>
          <div className={styles.infoContainer}>
            <p>Please provide details</p>
            <textarea
              value={usageOtherDetails}
              onChange={handleUsageOtherDetailsChange}
            ></textarea>
          </div>
        </div>
      )}
      <div className={styles.additionalInformationContainer}>
        <h3>Please provide any additional information</h3>
        <textarea></textarea>
      </div>
      <h3>What type of activity are you planning to use this data for?</h3>
      <RadioButtonComponent
        name="activity"
        options={activityOptions}
        onChange={handleActivityChange}
      />
      {activityIsOther() && (
        <div className={styles.wrapper}>
          <div className={styles.indicator}></div>
          <div className={styles.infoContainer}>
            <p>Please provide details</p>
            <textarea
              value={activityOtherDetails}
              onChange={handleActivityOtherDetailsChange}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerAppCreationPage;
