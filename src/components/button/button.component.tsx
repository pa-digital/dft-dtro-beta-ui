import classNames from "classnames";
import React from "react";
import styles from "./button.module.css";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Disabled = "disabled",
}

interface ButtonComponentProps {
  type: ButtonType;
  text: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ type, text }) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.primary]: type === ButtonType.Primary,
        [styles.secondary]: type === ButtonType.Secondary,
      })}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
