import React, { useRef } from "react";
import styles from "./two-factor-auth.module.css";
import classNames from "classnames";

interface TwoFactorAuthComponentProps {
  n: number;
  onChange: (index: number, value: string) => void;
}

const TwoFactorAuthComponent: React.FC<TwoFactorAuthComponentProps> = ({
  n,
  onChange,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleOnChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (!/^\d?$/.test(value)) return;
    onChange(index, value);

    if (value && index < n - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className={styles.container}>
      {Array.from({ length: n }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          className={classNames(styles.input, {
            [styles.valid]: inputsRef.current[index]?.value,
          })}
          onChange={(event) => handleOnChange(index, event)}
          pattern="[0-9]"
        ></input>
      ))}
    </div>
  );
};

export default TwoFactorAuthComponent;
