import React, { useState } from "react";
import styles from "./input.module.css";
import classNames from "classnames";

export enum InputType {
  Text = "text",
  Password = "password",
}

interface InputComponentProps {
  value: string;
  type: InputType;
  label?: string;
  onChange: (value: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  type,
  label,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        value={value}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
      ></input>
      <label
        className={classNames(styles.label, {
          [styles.focused]: isFocused,
          [styles.notEmpty]: value.length > 0,
        })}
      >
        {label}
      </label>
    </div>
  );
};

export default InputComponent;
