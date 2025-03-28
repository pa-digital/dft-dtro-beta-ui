import React from "react";
import styles from "./spinner.module.css";

interface SpinnerComponentProps {
  colour?: string;
}

const SpinnerComponent: React.FC<SpinnerComponentProps> = ({ colour = "rgb(0, 106, 176)" }) => {
  return <div className={styles.spinner} style={{borderTopColor: colour}}></div>;
};

export default SpinnerComponent;
