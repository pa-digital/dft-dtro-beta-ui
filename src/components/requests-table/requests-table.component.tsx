import React from "react";
import styles from "../table/table.module.css";
import Eye from "../../assets/eye.svg";
import { useNavigate } from "react-router-dom";
import { PendingRequest } from "../../pages/cso/pending-requests/pending-requests.component";

interface RequestsTableProps {
  requests: PendingRequest[];
}

const RequestsTableComponent: React.FC<RequestsTableProps> = ({ requests }) => {
  const navigate = useNavigate();

  const handleOnClick = (requestID: string): void => {
    navigate("/request-details", { state: { requestID } });
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
