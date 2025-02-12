import classNames from "classnames";
import React from "react";
import styles from "./button.module.css";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
}

interface ButtonComponentProps {
  type: ButtonType;
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  type,
  text,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.primary]: type === ButtonType.Primary,
        [styles.secondary]: type === ButtonType.Secondary,
        [styles.disabled]: disabled
      })}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
