import React from "react";
import styles from "../table/table.module.css";
import Eye from "../../assets/eye.svg";
import { useNavigate } from "react-router-dom";
import { User } from "../../pages/cso/active-users/active-users.page";
import { Routes as r } from "../../constants/routes";

interface UsersTableProps {
  users: User[];
}

const UsersTableComponent: React.FC<UsersTableProps> = ({ users }) => {
  const navigate = useNavigate();

  const handleOnClick = (user: User): void => {
    navigate(r.CSO.User, { state: { user } });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Created On</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.created}</td>
            <td>
              {user.status.replace(/\b\w/g, (char) => char.toUpperCase())}
            </td>
            <td>
              <button className={styles.button}>
                <div
                  className={styles.buttonContent}
                  onClick={() => handleOnClick(user)}
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

export default UsersTableComponent;
