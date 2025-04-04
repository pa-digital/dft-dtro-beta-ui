import React, { useEffect, useState } from "react";
import styles from "./two-factor-auth.module.css";
import TwoFactorAuthComponent from "../../components/two-factor-auth/two-factor-auth.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import TextComponent, {
  TypographyType,
} from "../../components/text/typography.component";
import { useNavigate } from "react-router-dom";
import { Routes as r } from "../../constants/routes";

const TwoFactorAuthPage: React.FC = () => {
  const n = 6;
  const [code, setCode] = useState<string[]>(Array(n).fill(""));
  const [verifyButtonValid, setVerifyButtonValid] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setVerifyButtonValid(code.every((digit) => digit !== ""));
  }, [code]);

  const handleOnChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleClick = (): void => {
    if (code.some((char) => char === "")) return;
    navigate(r.Home);
  };

  return (
    <div className={styles.content}>
      <div className={styles.headerContainer}>
        <TextComponent
          type={TypographyType.SubHeading}
          content="Two-Factor Authentication"
        />
      </div>
      <TextComponent
        type={TypographyType.SubDescription}
        content="Enter the 6-digit code sent to your email to verify your identity."
      />
      <TwoFactorAuthComponent n={n} onChange={handleOnChange} />
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type={ButtonType.Primary}
          onClick={handleClick}
          disabled={!verifyButtonValid}
        >
          Verify email
        </ButtonComponent>
        <ButtonComponent
          type={ButtonType.Secondary}
          onClick={() => {}}
        >
          Request a new code
        </ButtonComponent>
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;
