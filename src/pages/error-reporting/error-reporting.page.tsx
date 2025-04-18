import React, { useState } from "react";
import styles from "./error-reporting.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import RadioButtonComponent, { RadioButtonOption } from "../../components/radio-button/radio-button.component";
import ButtonComponent, { ButtonType } from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";

const ErrorReportingPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<number>();
    const options: RadioButtonOption[] = [
        { value: 0, title: "Yes", subtitle: "You will need to confirm the TRO ID on the next screen" },
        { value: 1, title: "No", subtitle: "You can identify relevant TRAs on the next screen" }
    ];
    const navigate = useNavigate();

    const handleOnChange = (value: number): void => {
        setSelectedOption(value);
    }

    const isTRO = (): boolean => {
        return options.find(o => o.title === "Yes")?.value === selectedOption;
    }

    return <div className={styles.content}>
        <NavLinkComponent text="Home" />
        <div className={styles.headerContainer}>
            <h2>Make a new error report</h2>
        </div>
        <p>Does your report relate to a specific TRO?</p>
        <RadioButtonComponent options={options} onChange={handleOnChange} name="error" outline={true} />
        <div style={{ width: "340px" }}>
            <ButtonComponent
                type={ButtonType.Primary}
                onClick={() => navigate(isTRO() ? "/error-report/is-tro" : "/error-report/no-tro")}
                disabled={selectedOption === undefined}>
                Confirm
            </ButtonComponent>
        </div>
    </div>;
}

export default ErrorReportingPage;