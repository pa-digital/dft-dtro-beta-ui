import React, { useState } from "react";
import styles from "./radio-button.module.css";

export interface RadioButtonOption {
  value: number;
  title: string;
  subtitle?: string;
}

interface RadioButtonComponentProps {
  options: RadioButtonOption[];
  onChange: (value: number) => void;
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  options,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div className={styles.optionContainer}>
          <div className={styles.option}>
            <input
              name="option"
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
