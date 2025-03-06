import React from "react";
import styles from "./action-link.module.css";
import ActionArrow from "../../assets/action-arrow.svg";
import classNames from "classnames";

interface ActionLinkComponentProps {
  text: string;
  link: string;
  enabled?: boolean;
}

const ActionLinkComponent: React.FC<ActionLinkComponentProps> = ({ text, link, enabled = false}) => {
    if (!enabled) {
        return (
          <div className={classNames(styles.actionContent, styles.disabledLink)}>
            <a href={link}>{text}</a>
            <img src={ActionArrow}></img>
        </div>
        )
    }
   return (
    <div className={styles.actionContent}>
        <a href={link}>{text}</a>
        <img src={ActionArrow}></img>
    </div>
  );
};

export default ActionLinkComponent;
