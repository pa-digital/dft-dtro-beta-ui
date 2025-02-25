import React from "react";
import styles from "./modal.module.css";
import ButtonComponent, { ButtonType } from "../button/button.component";

interface ModalProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onClick: () => void;
  cancelOnClick: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  subtitle,
  buttonText,
  onClick,
  cancelOnClick,
}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.buttonContainer}>
        <ButtonComponent
          type={ButtonType.Primary}
          text={buttonText}
          onClick={onClick}
        />
      </div>
      <a className={styles.cancelLink} onClick={cancelOnClick}>
        Cancel
      </a>
    </div>
  );
};

export default ModalComponent;
