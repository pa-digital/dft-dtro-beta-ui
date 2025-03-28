import React from "react";
import styles from "./pagination.module.css";
import classNames from "classnames";
import Chevron from "../../assets/chevron.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onClickDown: () => void;
  onClickNumber: (index: number) => void;
  onClickUp: () => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onClickDown,
  onClickNumber,
  onClickUp,
}) => {
  return (
    <div className={styles.paginationContainer}>
      <img
        className={classNames(styles.chevron, styles.chevronBack, {
          [styles.chevronDisabled]: currentPage === 1,
        })}
        src={Chevron}
        onClick={onClickDown}
      ></img>
      {Array.from({ length: totalPages || 1 }, (_, index) => (
        <div
          key={index}
          className={classNames(styles.pageLink, {
            [styles.activePage]: index === currentPage - 1,
          })}
          onClick={() => onClickNumber(index + 1)}
        >
          {index + 1}
        </div>
      ))}
      <img
        className={classNames(styles.chevron, {
          [styles.chevronDisabled]: currentPage === totalPages,
        })}
        src={Chevron}
        onClick={onClickUp}
      ></img>
    </div>
  );
};

export default PaginationComponent;
