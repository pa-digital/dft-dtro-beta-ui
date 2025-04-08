import React, { useState } from "react";
import styles from "./app-creation-details.module.css";
import NavLinkComponent from "../../../../components/nav-link/nav-link.component";
import RadioButtonComponent from "../../../../components/radio-button/radio-button.component";
import CheckboxComponent from "../../../../components/checkbox/checkbox.component";
import ButtonComponent, {
  ButtonType,
} from "../../../../components/button/button.component";
import {
  activityOptions,
  geographyOptions as regions,
  interestOptions,
  usageOptions,
  geographyOptions,
} from "./constants";
import SpinnerComponent from "../../../../components/spinner/spinner.component";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicationService from "../../../../services/application";

const ConsumerAppCreationPage: React.FC = () => {
  const location = useLocation();
  const appName = location.state.appName;

  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [usage, setUsage] = useState<number>();
  const [usageOtherDetails, setUsageOtherDetails] = useState<string>("");
  const [usageMoreInformation, setUsageMoreInformation] = useState<string>("");

  const [activity, setActivity] = useState<number>();
  const [activityOtherDetails, setActivityOtherDetails] = useState<string>("");

  const [geography, setGeography] = useState<boolean[]>(
    new Array(regions.length).fill(false)
  );

  const [interest, setInterets] = useState<boolean[]>(
    new Array(interestOptions.length).fill(false)
  );
  const [interestOtherDetails, setInterestOtherDetails] = useState<string>();

  const handleUsageChange = (value: number): void => {
    setUsage(value);
  };

  const handleActivityChange = (value: number): void => {
    setActivity(value);
  };

  const handleGeographyChange = (selected: boolean[]): void => {
    setGeography(selected);
  };

  const handleInterestChange = (selected: boolean[]): void => {
    setInterets(selected);
  };

  const usageIsOther = () => {
    return usage === usageOptions.find((v) => v.title === "Other")?.value;
  };

  const activityIsOther = () => {
    return activity === activityOptions.find((v) => v.title === "Other")?.value;
  };

  const interestIsOther = () => {
    const otherIndex = interestOptions.findIndex((v) => v.title === "Other");
    return interest[otherIndex];
  };

  const handleUsageOtherDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUsageOtherDetails(event.target.value);
  };

  const handleUsageMoreInformationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUsageMoreInformation(event.target.value);
  };

  const handleActivityOtherDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setActivityOtherDetails(event.target.value);
  };

  const handleInterestOtherDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInterestOtherDetails(event.target.value);
  };

  const getRegions = () => {
    const regions = geographyOptions
      .map((item, index) => (geography[index] ? item.title : null))
      .filter((name) => name !== null);

      return regions.join(", ");
  };

  const getInterests = () => {
    const interests = interestOptions
      .map((item, index) => (interest[index] ? item.title : null))
      .filter((name) => name !== null);

    return interests.join(", ");
  };

  const isDataValid = (): boolean => {
    if (usage === undefined || usage === null) return false;
    if (
      usageIsOther() &&
      (usageOtherDetails === null ||
        usageOtherDetails === undefined ||
        usageOtherDetails?.trim().length === 0)
    )
      return false;

    if (activity === null || activity === undefined) return false;
    if (
      activityIsOther() &&
      (activityOtherDetails === null ||
        activityOtherDetails === undefined ||
        activityOtherDetails?.trim().length === 0)
    )
      return false;

    if (geography.every((item) => item === false)) return false;

    if (interest.every((item) => item === false)) return false;
    const interestOtherIndex = interestOptions.findIndex(
      (item) => item.title === "Other"
    );
    if (interestOtherIndex === -1) return false;
    if (
      interest[interestOtherIndex] &&
      (interestOtherDetails === null ||
        interestOtherDetails === undefined ||
        interestOtherDetails?.trim().length === 0)
    )
      return false;

    return true;
  };

  const handleSubmission = async () => {
    if (!isDataValid() || isCreating) {
      return;
    }

    setIsCreating(true);

    const payload = {
      name: appName,
      type: "Consume",
      purpose: usageIsOther() ? `${usageOptions[usage!].title} - ${usageOtherDetails}` : usageOptions[usage!].title,
      ...(usageMoreInformation && {
        additionalInformation: usageMoreInformation,
      }),
      activity: activityIsOther() ? `${activityOptions[activity!].title} - ${activityOtherDetails}` : activityOptions[activity!].title,
      regions: getRegions(),
      dataType: interestIsOther() ? `${getInterests()} - ${interestOtherDetails}` : getInterests()
    };

    try {
      const token = ""; // TODO: add token from login
      const data = await ApplicationService.createApp(payload, token);
      navigate("/details", { state: { from: "create", appID: data.appId } });
    } catch (error) {
      console.error("Error creating consumer application: ", error);
    } finally {
      setIsCreating(false);
    }
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
          <div
            className={styles.indicator}
            style={{ marginLeft: "26px" }}
          ></div>
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
        <textarea
          value={usageMoreInformation}
          onChange={handleUsageMoreInformationChange}
        ></textarea>
      </div>
      <h3>What type of activity are you planning to use this data for?</h3>
      <RadioButtonComponent
        name="activity"
        options={activityOptions}
        onChange={handleActivityChange}
      />
      {activityIsOther() && (
        <div className={styles.wrapper}>
          <div
            className={styles.indicator}
            style={{ marginLeft: "26px" }}
          ></div>
          <div className={styles.infoContainer}>
            <p>Please provide details</p>
            <textarea
              value={activityOtherDetails}
              onChange={handleActivityOtherDetailsChange}
            ></textarea>
          </div>
        </div>
      )}
      <h3>What areas of the country are you interested in?</h3>
      <div className={styles.cardContainer}>
        <CheckboxComponent
          items={regions}
          allowSelectAll={true}
          onChange={handleGeographyChange}
        />
      </div>
      <h3>What type(s) of data are you interested in?</h3>
      <div className={styles.cardContainer}>
        <CheckboxComponent
          items={interestOptions}
          onChange={handleInterestChange}
        />
        {interestIsOther() && (
          <div className={styles.wrapper}>
            <div
              className={styles.indicator}
              style={{ marginLeft: "16px" }}
            ></div>
            <div className={styles.infoContainer}>
              <p>Please provide details</p>
              <textarea
                value={interestOtherDetails}
                onChange={handleInterestOtherDetailsChange}
              ></textarea>
            </div>
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type={ButtonType.Primary}
          onClick={handleSubmission}
          disabled={!isDataValid()}
        >
          {isCreating ? <SpinnerComponent colour="rgb(255, 255, 255)" /> : 'Create'}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ConsumerAppCreationPage;
