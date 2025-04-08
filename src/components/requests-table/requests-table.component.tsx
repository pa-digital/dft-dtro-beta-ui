import React from "react";
import styles from "../table/table.module.css";
import Eye from "../../assets/eye.svg";
import useAuthNavigate from "../../hooks/use-auth-navigate";
import { PendingRequest } from "../../pages/cso/pending-requests/pending-requests.page";
import { Routes as r } from "../../constants/routes";

interface RequestsTableProps {
  requests: PendingRequest[];
}

const RequestsTableComponent: React.FC<RequestsTableProps> = ({ requests }) => {
  const navigate = useAuthNavigate();

  const handleOnClick = (requestID: string): void => {
    navigate(r.CSO.RequestDetails, { state: { requestID } });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>User</th>
          <th>Type</th>
          <th>Linked TRA</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr>
            <td>{request.user}</td>
            <td>{request.type}</td>
            <td>{request.tra}</td>
            <td>
              <button className={styles.button}>
                <div
                  className={styles.buttonContent}
                  onClick={() => handleOnClick(request.id)}
                >
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

export default RequestsTableComponent;
