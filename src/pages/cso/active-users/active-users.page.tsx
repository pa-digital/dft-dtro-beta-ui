import React, { useEffect, useState } from "react";
import sharedStyles from "../../../styles/shared.module.css";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import Up from "../../../assets/up-arrow.svg";
import Refresh from "../../../assets/refresh.svg";
import More from "../../../assets/more.svg";
import PaginationComponent from "../../../components/pagination/pagination.component";
import { SortOrder } from "../pending-requests/pending-requests.page";
import UsersTableComponent from "../../../components/users-table/users-table.component";
import classNames from "classnames";
import UserService from "../../../services/user";

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
  name: string;
  email: string;
  created: string;
  status: UserStatus;
}

const ActiveUsersPage: React.FC = () => {
  const usersPerPage = 10;
  const [users, setUsers] = useState<UsersView>();
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Descending);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: fetch requests from the backend for this page
    fetchUsers(page, sortOrder);
  }, []);

  useEffect(() => {
    fetchUsers(page, sortOrder);
  }, [page, sortOrder]);

  const fetchUsers = async (page: number, sortOrder: SortOrder): Promise<void> => {
    setLoading(true);
    try {
      const token = ""; // TODO: add token from login
      const data = await UserService.getUsers(page, sortOrder, token);
      setUsers(
        {
          pages: data.totalPages,
          currentPage: data.page,
          users: data.users
        }
      )
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  // const usersPerPage = 10;
  // const startIndex = (page - 1) * usersPerPage;
  // const endIndex = startIndex + usersPerPage;
  // const users = allUsers.slice(startIndex, endIndex);
  // setUsers({
  //   pages: Math.ceil(allUsers.length / usersPerPage),
  //   currentPage: page,
  //   users,
  // });
};

return (
  <div className={sharedStyles.content}>
    <SidebarComponent />
    <div className={sharedStyles.dynamicContent}>
      <h2>Users</h2>
      <p>
        View all users and click through to view details and manage user
        accounts
      </p>
      <div className={sharedStyles.card}>
        <div className={sharedStyles.tableControls}>
          <div className={sharedStyles.controlItem} onClick={() => setSortOrder(SortOrder.Ascending)}>
            <div>ASC</div>
            <img src={Up} />
          </div>
          <div className={sharedStyles.controlItem} onClick={() => setSortOrder(SortOrder.Descending)}>
            <div>DESC</div>
            <img className={sharedStyles.downArrow} src={Up} />
          </div>
          <div className={sharedStyles.trailingControls}>
            <div
              className={sharedStyles.controlItem}
              onClick={() => setPage(1)}
            >
              {/* Calling setPage triggers fetching of the data */}
              <img className={classNames({[sharedStyles.spin]: loading})} src={Refresh} onClick={() => fetchUsers(page, SortOrder.Ascending)}></img>
            </div>
            <div className={sharedStyles.controlItem}>
              <img className={sharedStyles.downArrow} src={Up}></img>
            </div>
            <div className={sharedStyles.controlItem}>
              <img src={More}></img>
            </div>
          </div>
        </div>
        {users && (
          <div className={sharedStyles.tableContainer}>
            <UsersTableComponent users={users.users} />
            <PaginationComponent
              currentPage={page}
              totalPages={users.pages}
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
