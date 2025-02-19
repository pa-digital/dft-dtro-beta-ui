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
  trailingIcons?: TrailingIcon[];
  onChange?: (value: string) => void;
}

interface TrailingIcon {
  src?: string;
  show?: boolean;
  text?: string;
  onClick?: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  type,
  label,
  editable = true,
  trailingIcons,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={classNames(styles.input, {
          [styles.notEditable]: !editable,
          [styles.noLabel]: !label,
        })}
        value={value}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange?.(e.target.value)}
      ></input>
      <label
        className={classNames(styles.label, {
          [styles.focused]: isFocused,
          [styles.notEmpty]: value.length > 0,
        })}
      >
        {label}
      </label>
      {trailingIcons &&
        trailingIcons.map((icon, index) =>
          icon.show && icon.src ? (
            <img
              key={index}
              className={styles.icon}
              src={icon.src}
              onClick={icon.onClick}
            />
          ) : (
            <div
              key={index}
              className={classNames(styles.icon, styles.textIcon)}
              onClick={icon.onClick}
            >
              {icon.text}
            </div>
          )
        )}
    </div>
  );
};

export default InputComponent;
