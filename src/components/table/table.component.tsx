import React from "react";
import styles from "./table.module.css";
import Eye from "../../assets/eye.svg";

interface TableProps {
  headers?: string[];
  content: (string | null)[][];
}

const TableComponent: React.FC<TableProps> = ({ headers, content }) => {
  return (
    <table className={styles.table}>
      {headers && (
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {content.map((row) => (
          <tr>
            {row.map((item) => (
              <td>{item}</td>
            ))}
            <td>
              <button className={styles.button}>
                <div className={styles.buttonContent}>
                  <p>View</p>
                  <img src={Eye}></img>
                </div>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
