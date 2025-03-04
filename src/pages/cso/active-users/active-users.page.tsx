import React, { useEffect, useState } from "react";
import styles from "../pending-requests/pending-requests.module.css";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import Up from "../../../assets/up-arrow.svg";
import Refresh from "../../../assets/refresh.svg";
import More from "../../../assets/more.svg";
import PaginationComponent from "../../../components/pagination/pagination.component";
import { SortOrder } from "../pending-requests/pending-requests.page";
import UsersTableComponent from "../../../components/users-table/users-table.component";

interface UsersView {
  pages: number;
  currentPage: number;
  users: User[];
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface User {
  id: string;
  user: string;
  email: string;
  role: string;
  createdOn: Date;
  status: UserStatus;
}

const ActiveUsersPage: React.FC = () => {
  const usersPerPage = 10;
  const [users, setUsers] = useState<UsersView>();
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Descending);
  const [allUsers, setAllUsers] = useState<User[]>([
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
    {
      id: "some Id",
      user: "Test User",
      email: "user@test.com",
      role: "Publisher account",
      createdOn: new Date(),
      status: UserStatus.Active,
    },
  ]);

  useEffect(() => {
    // TODO: fetch requests from the backend for this page
    fetchUsers(page, sortOrder);
  }, []);

  useEffect(() => {
    fetchUsers(page, sortOrder);
  }, [page, sortOrder]);

  const fetchUsers = (page: number, sortOrder: SortOrder): void => {
    const usersPerPage = 10;
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const users = allUsers.slice(startIndex, endIndex);
    setUsers({
      pages: Math.ceil(allUsers.length / usersPerPage),
      currentPage: page,
      users,
    });
  };

  return (
    <div className={styles.content}>
      <SidebarComponent />
      <div className={styles.dynamicContent}>
        <h2>Active users</h2>
        <p>
          View all users and click through to view details and manage user
          accounts
        </p>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Request log</div>
          <div className={styles.tableControls}>
            <div className={styles.controlItem}>
              <div>ASC</div>
              <img src={Up} />
            </div>
            <div className={styles.controlItem}>
              <div>DESC</div>
              <img className={styles.downArrow} src={Up} />
            </div>
            <div className={styles.trailingControls}>
              <div className={styles.controlItem} onClick={() => setPage(1)}>
                {/* Calling setPage triggers fetching of the data */}
                <img src={Refresh}></img>
              </div>
              <div className={styles.controlItem}>
                <img className={styles.downArrow} src={Up}></img>
              </div>
              <div className={styles.controlItem}>
                <img src={More}></img>
              </div>
            </div>
          </div>
          {users && (
            <div className={styles.tableContainer}>
              <UsersTableComponent users={users.users} />
              <PaginationComponent
                currentPage={page}
                totalPages={Math.ceil(allUsers.length / usersPerPage)}
                onClickDown={() => setPage((prev) => prev - 1)}
                onClickNumber={(index: number) => {
                  setPage(index);
                }}
                onClickUp={() => setPage((prev) => prev + 1)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersPage;
