import classNames from "classnames";
import React from "react";
import styles from "./button.module.css";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Warning = "warning",
}

interface ButtonComponentProps {
  children: React.ReactNode;
  type: ButtonType;
  dataTestId?: string;
  disabled?: boolean;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  type,
  dataTestId,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.primary]: type === ButtonType.Primary,
        [styles.secondary]: type === ButtonType.Secondary,
        [styles.warning]: type === ButtonType.Warning,
        [styles.disabled]: disabled,
      })}
      data-testid={dataTestId}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
