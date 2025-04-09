import React from "react";
import styles from "../table/table.module.css";
import Eye from "../../assets/eye.svg";
import useAuthNavigate from "../../hooks/use-auth-navigate";
import { App } from "../../pages/app-list/app-list.page";
import { Routes as r } from "../../constants/routes";
import { isProductionEnv } from "../../utils/env";

interface AppListTableProps {
  apps: App[];
  readOnly?: boolean;
}

const AppListTableComponent: React.FC<AppListTableProps> = ({
  apps,
  readOnly = false,
}) => {
  const navigate = useAuthNavigate();

  const handleOnClick = (appID: string): void => {
    navigate(r.Details, { state: { from: "list", appID } });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Linked TRA</th>
          {!readOnly && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {apps.map((app, index) => (
          <tr key={index}>
            <td>{app.name}</td>
            <td>{app.type}</td>
            <td>{!isProductionEnv() || app.tra === null ? "-" : app.tra}</td>
            {!readOnly && (
              <td>
                <button className={styles.button}>
                  <div
                    className={styles.buttonContent}
                    onClick={() => handleOnClick(app.id)}
                  >
                    <p>View</p>
                    <img src={Eye}></img>
                  </div>
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppListTableComponent;
