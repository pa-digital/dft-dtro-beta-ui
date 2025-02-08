import React from "react";
import styles from "./two-factor-auth.module.css";

interface TwoFactorAuthComponentProps {
  n: number;
}

const TwoFactorAuthComponent: React.FC<TwoFactorAuthComponentProps> = ({
  n,
}) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: n }, (_, index) => (
        <input key={index} className={styles.input}></input>
      ))}
    </div>
  );
};

export default TwoFactorAuthComponent;
