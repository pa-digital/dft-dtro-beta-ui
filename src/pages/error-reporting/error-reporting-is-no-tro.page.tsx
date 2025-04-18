import React, { useRef, useState } from "react";
import styles from "../app-creation/consumer/app-creation-details/app-creation-details.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import SpinnerComponent from "../../components/spinner/spinner.component";
import RadioButtonComponent, { RadioButtonOption } from "../../components/radio-button/radio-button.component";
import ButtonComponent, { ButtonType } from "../../components/button/button.component";
import TextComponent, { TypographyType } from "../../components/text/typography.component";
import SearchableDropdownComponent from "../../components/searchable-dropdown/searchable-dropdown.component";
import Search from "../../assets/search.svg";
import axiosInstance from "../../utils/axios-instance";
import CheckboxComponent from "../../components/checkbox/checkbox.component";
import { errorTypeItems, regulationTypeItems, troTypeItems } from "./constants";
import ImageUploadComponent from "../../components/image-upload/image-upload.component";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface TRA {
    name: string;
    swaCode: number;
}

const ErrorReportingIsNoTROPage: React.FC = () => {
    const [displayTras, setDisplayTras] = useState<TRA[]>([]);
    const [selectedTras, setSelectedTras] = useState<TRA[]>([]);
    const [regulationTypes, setRegulationTypes] = useState<boolean[]>(new Array(regulationTypeItems.length).fill(false));
    const [troTypes, setTROTypes] = useState<boolean[]>(new Array(troTypeItems.length).fill(false));
    const [errorType, setErrorType] = useState<number>();
    const [errorTypeOtherDetails, setErrorTypeOtherDetails] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const traDebounceTimeout = useRef<ReturnType<typeof setTimeout>>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const navigate = useNavigate();

    const fetchTRAs = async (value: string) => {
        try {
            const response = await axiosInstance.get<TRA[]>(`/tras?traName=${value}`);
            const displayTras = response.data.filter(tra => !selectedTras.some(item => item.name === tra.name));
            setDisplayTras(displayTras);
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 404) {
                setDisplayTras([]);
            } else {
                console.error("Could not fetch TRAs");
            }
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

    const handleOnSelect = (value: string | string[]) => {
        if (Array.isArray(value)) {
            setSelectedTras(displayTras.filter(t => value.includes(t.name)));
        } else {
            setSelectedTras(displayTras.filter(t => t.name === value));
        }
    };

    const handleRegulationTypeOnChange = (selected: boolean[]) => {
        setRegulationTypes(selected);
    };

    const handleTROTypeOnChange = (selected: boolean[]) => {
        setTROTypes(selected);
    };

    const handleErrorTypeOnChange = (value: number) => {
        setErrorType(value);
    };

    const errorTypeIsOther = () => {
        return errorType === errorTypeItems.find((v) => v.title === "Other")?.value;
    };

    const handleErrorTypeOtherDetailsOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setErrorTypeOtherDetails(event.target.value);
    };

    const handleDetailsOnChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDetails(event.target.value);
    };

    const isValid = (): boolean => {
        if (errorTypeIsOther() && errorTypeOtherDetails === "") return false;

        return selectedTras.length > 0 && regulationTypes.some(Boolean) && troTypes.some(Boolean) && errorType !== undefined && details !== "";
    };

    const handleOnClick = async (): Promise<void> => {
        if (!isValid) return;
        setIsCreating(true);

        const formData = new FormData();
        selectedTras.forEach(t => {
            formData.append("Tras", t.name);
        });

        const rTypes = regulationTypeItems.filter((_, index) => regulationTypes[index]);
        rTypes.forEach(rt => {
            formData.append("RegulationTypes", rt.title);
        });

        const tTypes = troTypeItems.filter((_, index) => troTypes[index]);
        tTypes.forEach(tt => {
            formData.append("TroTypes", tt.title);
        });

        formData.append("Type", errorTypeItems.find(i => i.value === errorType)?.title ?? "");
        formData.append("OtherType", errorTypeOtherDetails);
        formData.append("MoreInformation", details);

        uploadedFiles.forEach(file => {
            formData.append("Files", file);
        });

        try {
            console.log(formData);
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
            <h2>Provide details of the error</h2>
        </div>
        <TextComponent
            type={TypographyType.SubDescription}
            content="Search and select the TRA(s) this error relates to"
        />
        <SearchableDropdownComponent
            items={displayTras.map(tra => tra.name)}
            leadingIcon={Search}
            onChange={handleSearchChange}
            onSelect={handleOnSelect}
            placeholderText="Start typing to search for a TRA ..."
            allowMulti={true}
        />
        <p>Can't find the TRA? Contact <a>dtro-cso@dft.gov.uk</a>.</p>
        <h3>Select the Regulation Type(s) this error relates to</h3>
        <CheckboxComponent items={regulationTypeItems} onChange={handleRegulationTypeOnChange} />
        <h3>Select the TRO Type(s) this error relates to</h3>
        <CheckboxComponent items={troTypeItems} onChange={handleTROTypeOnChange} />
        <h3>Select error type</h3>
        <RadioButtonComponent name="errorType" options={errorTypeItems} onChange={handleErrorTypeOnChange} />
        {errorTypeIsOther() && (
            <div className={styles.wrapper}>
                <div
                    className={styles.indicator}
                    style={{ marginLeft: "26px" }}
                ></div>
                <div className={styles.infoContainer}>
                    <p>Please provide details</p>
                    <textarea
                        value={errorTypeOtherDetails}
                        onChange={handleErrorTypeOtherDetailsOnChange}
                    ></textarea>
                </div>
            </div>
        )}
        <div className={styles.additionalInformationContainer}>
            <h3>Please provide details of the error</h3>
            <textarea
                value={details}
                onChange={handleDetailsOnChange}
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

export default ErrorReportingIsNoTROPage;