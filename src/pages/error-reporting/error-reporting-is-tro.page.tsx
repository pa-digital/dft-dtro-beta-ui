import React, { useState } from "react";
import styles from "../app-creation/consumer/app-creation-details/app-creation-details.module.css";
import sharedStyles from "../../styles/shared.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import InputComponent, { InputType } from "../../components/input/input.component";
import SpinnerComponent from "../../components/spinner/spinner.component";
import Check from "../../assets/check.svg";
import classNames from "classnames";
import RadioButtonComponent, { RadioButtonOption } from "../../components/radio-button/radio-button.component";
import ButtonComponent, { ButtonType } from "../../components/button/button.component";
import ImageUploadComponent from "../../components/image-upload/image-upload.component";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios-instance";

const ErrorReportingIsTROPage: React.FC = () => {
    const [troID, setTROID] = useState<string>("");
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [validationResponse, setValidationResponse] = useState<boolean>();
    const [type, setType] = useState<number>();
    const [otherType, setOtherType] = useState<string>("");
    const [moreInformation, setMoreInformation] = useState<string>("");
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const navigate = useNavigate();

    const items: RadioButtonOption[] = [
        { value: 0, title: "Dates" },
        { value: 1, title: "TRO title" },
        { value: 2, title: "Geometry" },
        { value: 3, title: "Regulation type" },
        { value: 4, title: "TRA" },
        { value: 5, title: "Other" },
    ]

    const handleOnChange = async (value: string) => {
        setValidationResponse(undefined);
        let cleaned = value.replace(/[^a-fA-F0-9]/g, "").toLowerCase();

        let formatted = "";
        const sections = [8, 4, 4, 4, 12];
        let index = 0;

        for (let i = 0; i < sections.length; i++) {
            if (index < cleaned.length) {
                if (formatted.length > 0) formatted += "-";
                formatted += cleaned.substring(index, index + sections[i]);
                index += sections[i];
            }
        }

        if (formatted === troID) return;

        setTROID(formatted);
        if (isGuid(formatted)) {
            await validateTROID(formatted);
        }
    }

    const handleTypeChange = (value: number): void => {
        setType(value);
    }

    const isGuid = (guid: string): boolean => {
        const guidRegex = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/i;
        return guidRegex.test(guid);
    }

    const validateTROID = async (guid: string): Promise<void> => {
        setIsValidating(true);
        if (guid === "") return;

        try {
            const response = await axiosInstance.post("/dtros/validate", { Id: guid });
            setValidationResponse(response.data.valid);
        } catch (error) {
            setValidationResponse(false);
        } finally {
            setIsValidating(false);
        }
    }

    const handleOtherTypeChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setOtherType(event.target.value);
    }

    const isOtherType = (): boolean => {
        return type === items.find(i => i.title === "Other")?.value;
    }

    const handleMoreInformationChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMoreInformation(event.target.value);
    };

    const isValid = (): boolean => {
        if (type === items.find(i => i.title === "Other")?.value && otherType === "") return false;

        return troID !== "" && validationResponse === true && type !== undefined;
    }

    const handleOnClick = async (): Promise<void> => {
        if (!isValid) return;
        setIsCreating(true);

        const formData = new FormData();
        formData.append("TroId", troID);
        formData.append("Type", items.find(i => i.value === type)?.title ?? "");
        formData.append("OtherType", otherType);
        formData.append("MoreInformation", moreInformation);

        uploadedFiles.forEach(file => {
            formData.append("Files", file);
        });

        try {
            const response = await axiosInstance.post("/errorReport", formData);
            if (response.status === 200) {
                navigate("/error-report/submitted");
            } else {
                console.error("An error occurred when submitting the error report");
            }
        } catch (error) {
            console.error("An error occurred when submitting the error report");
        } finally {
            setIsCreating(false);
        }
    }

    return <div className={styles.content}>
        <NavLinkComponent text="Home" link="/home" />
        <div className={styles.headerContainer}>
            <h2>Search for TRO</h2>
        </div>
        <div>
            <InputComponent value={troID} type={InputType.Text} label="Enter TRO ID" onChange={handleOnChange} trailingIcons={[
                {
                    show:
                        troID !== "" &&
                        validationResponse &&
                        !isValidating,
                    src: Check,
                },
                {
                    show: troID !== "" && isValidating,
                    element: <SpinnerComponent />,
                },
            ]} />
            {validationResponse !== undefined && <div
                className={classNames(sharedStyles.validationMessageContainer, {
                    [sharedStyles.show]: troID !== "" && validationResponse !== undefined,
                    [sharedStyles.valid]: validationResponse,
                    [sharedStyles.invalid]: !validationResponse,
                })}
            >
                <p
                    className={classNames(sharedStyles.validation, {
                        [sharedStyles.valid]: validationResponse,
                        [sharedStyles.invalid]: !validationResponse,
                    })}
                >
                    {validationResponse && "TRO ID found"}
                    {!validationResponse && "Could not find TRO with this ID"}
                </p>
            </div>}
            <div className={sharedStyles.messageContainer}>
                <p>Can't find the right TRO? Contact <a>dtro-cso@dft.gov.uk</a>.</p>
            </div>
        </div>
        <RadioButtonComponent options={items} onChange={handleTypeChange} name={"type"} outline={true} />
        {isOtherType() && <div className={styles.wrapper}>
            <div
                className={styles.indicator}
                style={{ marginLeft: "26px" }}
            ></div>
            <div className={styles.infoContainer}>
                <p>Please provide details</p>
                <textarea
                    value={otherType}
                    onChange={handleOtherTypeChange}
                ></textarea>
            </div>
        </div>}
        <div className={styles.additionalInformationContainer}>
            <h3>Please provide details of the error</h3>
            <textarea
                value={moreInformation}
                onChange={handleMoreInformationChange}
            ></textarea>
        </div>
        <ImageUploadComponent onFilesSelected={setUploadedFiles} />
        <div className={styles.buttonContainer}>
            <ButtonComponent
                type={ButtonType.Primary}
                onClick={handleOnClick}
                disabled={!isValid()}
            >
                {isCreating ? <SpinnerComponent colour="rgb(255, 255, 255)" /> : "Submit"}
            </ButtonComponent>
        </div>
    </div>;
}

export default ErrorReportingIsTROPage;