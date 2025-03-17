import React, { useState } from "react";
import styles from "./radio-button.module.css";
import classNames from "classnames";

export interface RadioButtonOption {
  value: number;
  title: string;
  subtitle?: string;
}

interface RadioButtonComponentProps {
  name: string;
  options: RadioButtonOption[];
  onChange: (value: number) => void;
  outline?: boolean;
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  name,
  options,
  onChange,
  outline = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={classNames(styles.container, { [styles.border]: outline })}>
      {options.map((option) => (
        <div className={styles.optionContainer} key={option.value}>
          <div className={styles.option}>
            <input
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChange}
            ></input>
            <div className={styles.title}>{option.title}</div>
          </div>
          {option.subtitle && (
            <div className={styles.subtitle}>{option.subtitle}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioButtonComponent;
