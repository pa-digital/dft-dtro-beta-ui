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
  editable?: boolean;
  trailingIcon?: string;
  onChange: (value: string) => void;
  onIconClick?: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  type,
  label,
  editable = true,
  trailingIcon,
  onChange,
  onIconClick,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={classNames(styles.input, {
          [styles.notEditable]: !editable,
        })}
        value={value}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        // disabled={!editable}
      ></input>
      <label
        className={classNames(styles.label, {
          [styles.focused]: isFocused,
          [styles.notEmpty]: value.length > 0,
        })}
      >
        {label}
      </label>
      {trailingIcon && (
        <img
          className={styles.icon}
          src={trailingIcon}
          onClick={onIconClick}
        ></img>
      )}
    </div>
  );
};

export default InputComponent;
