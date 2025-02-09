import React, { useState } from "react";
import styles from "./radio-button.module.css";

interface RadioButtonOption {
  value: number;
  title: string;
  subtitle?: string;
}

interface RadioButtonComponentProps {
  options: RadioButtonOption[];
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  options,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(options[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt(event.target.value));
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
