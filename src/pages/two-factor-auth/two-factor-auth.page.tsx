import React, { useEffect, useState } from "react";
import styles from "./two-factor-auth.module.css";
import TwoFactorAuthComponent from "../../components/two-factor-auth/two-factor-auth.component";
import ButtonComponent, {
  ButtonType,
} from "../../components/button/button.component";
import NavLinkComponent from "../../components/nav-link/nav-link.component";

const TwoFactorAuthPage: React.FC = () => {
  const n = 6;
  const [code, setCode] = useState<string[]>(Array(n).fill(""));
  const [verifyButtonValid, setVerifyButtonValid] = useState<boolean>(false);

  useEffect(() => {
    setVerifyButtonValid(code.every((digit) => digit !== ""));
  }, [code]);

  const handleOnChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Sign in" link="/" />
      <div className={styles.headerContainer}>
        <h2>Two-Factor Authentication</h2>
      </div>
      <p>Enter the 6-digit code sent to your email to verify your identity.</p>
      <TwoFactorAuthComponent n={n} onChange={handleOnChange} />
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type={ButtonType.Primary}
          text="Verify email"
          onClick={() => {}}
          disabled={!verifyButtonValid}
        />
        <ButtonComponent
          type={ButtonType.Secondary}
          text="Request a new code"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;
