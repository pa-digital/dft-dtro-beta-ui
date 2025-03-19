import React from "react";
import sharedStyles from "../../styles/shared.module.css";
import styles from "./tro-card.module.css";
import classNames from "classnames";
import Copy from "../../assets/copy.svg";
import { ToastContainer, toast } from "react-toastify";

interface TROCardComponentProps {
  name: string;
  region: string;
  tra: string;
  troType: string;
  regulationType: string;
  id: string;
  dsp: string;
  effectiveDate: Date;
  publishDate: Date;
}

const handleCopyClick = (id: string) => {
  navigator.clipboard.writeText(id);
  showToast("Copied to clipboard");
};

const showToast = (text: string) => {
  toast(text, {
    position: "bottom-right",
    autoClose: 2000,
    theme: "light",
    hideProgressBar: true,
  });
};

const TROCardComponent: React.FC<TROCardComponentProps> = ({
  name,
  region,
  tra,
  troType,
  regulationType,
  id,
  dsp,
  effectiveDate,
  publishDate,
}) => {
  return (
    <>
      <div className={classNames(sharedStyles.card, styles.card)}>
        <div className={classNames(styles.column, styles.columnLeft)}>
          <div className={styles.troName}>"{name}"</div>
          <div className={styles.details}>
            {region} | {tra} | {troType} | {regulationType}
          </div>
          <div className={styles.idContainer}>
            <div className={styles.id}>TRO ID: {id}</div>
            <img src={Copy} onClick={() => handleCopyClick(id)}></img>
          </div>
          <div className={styles.dsp}>Published by {dsp}</div>
        </div>
        <div className={styles.column}>
          <div className={styles.date}>
            Effective on: {effectiveDate.toLocaleDateString("en-GB")}
          </div>
          <div className={styles.date}>
            Published on: {publishDate.toLocaleDateString("en-GB")}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default TROCardComponent;
